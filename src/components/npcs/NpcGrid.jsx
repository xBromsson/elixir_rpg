import {
  SimpleGrid,
  InputGroup,
  InputRightElement,
  Input,
  Box,
  HStack,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Checkbox,
  CheckboxGroup,
  VStack,
  FormControl,
  Stack,
  Collapse,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  FaFilter,
  FaSearch,
  FaSortAlphaDownAlt,
  FaSortAlphaDown,
} from "react-icons/fa";
import NpcCard from "./NpcCard";
import NpcCreate from "./NpcCreate";
import buildNpc from "../../modules/buildNpc";
import buildItem from "../../modules/buildItem";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  addDoc,
  deleteDoc,
  doc,
  where,
  getDocs,
} from "firebase/firestore";

const NpcGrid = () => {
  const [npcs, setNpcs] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [sliderValues, setSliderValues] = useState({
    alignment: "neutral",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [alignmentFilter, setAlignmentFilter] = useState([]);
  const [showAlignmentFilters, setShowAlignmentFilters] = useState(false);

  // fetches initial npc data from db and updates local state variable
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "npcs"), orderBy("name", sortOrder)),
      (snapshot) => {
        const loadedNpcs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNpcs(loadedNpcs);
      }
    );
    return () => unsubscribe();
  }, [sortOrder]);

  // receives data from npcCreate slider and updates local slidevalue variable
  const handleSliderChange = (name, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Creates an NPC and Item? updates db and local state variable
  const handleCreate = async () => {
    setIsLoading(true);
    const npcData = await buildNpc(sliderValues);
    const itemData = await buildItem(sliderValues);

    try {
      // Create an NPC in the Firestore database
      const npcRef = await addDoc(collection(db, "npcs"), npcData);
      const createdNpc = { id: npcRef.id, ...npcData };

      // Create an Item in the Firestore database
      const itemRef = await addDoc(collection(db, "items"), itemData);
      const createdItem = { id: itemRef.id, ...itemData };

      // Create an entry in the npc_items collection in the Firestore database
      await addDoc(collection(db, "npc_items"), {
        npc_id: createdNpc.id,
        item_id: createdItem.id,
      });

      setNpcs([...npcs, createdNpc]);
    } catch (error) {
      console.error("Error creating NPC and Item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Delete the NPC from the Firestore database
      await deleteDoc(doc(db, "npcs", id));

      // Query npc_items collection to get the related npc_item documents
      const npcItemsQuery = query(
        collection(db, "npc_items"),
        where("npc_id", "==", id)
      );

      const npcItemsQuerySnapshot = await getDocs(npcItemsQuery);

      // iterate over the fetched related npc_items and delete them one by one
      for (const npcItemDoc of npcItemsQuerySnapshot.docs) {
        await deleteDoc(doc(db, "npc_items", npcItemDoc.id));
      }

      // Update the local state to remove the deleted NPC
      setNpcs(npcs.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error deleting NPC and its related Items:", error);
    }
  };

  // updates search state variable
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // updates sort order
  const handleSort = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  // updates alignment filter values
  const handleAlignmentFilterChange = (values) => {
    setAlignmentFilter(values);
  };

  // clears any selected alignment filters
  const clearAllAlignments = () => {
    setAlignmentFilter([]);
  };

  return (
    <Box>
      <HStack w={"30%"} py={3}>
        <InputGroup>
          <Input value={searchTerm} onChange={handleSearch}></Input>
          <InputRightElement>
            <FaSearch />
          </InputRightElement>
        </InputGroup>

        <Button onClick={handleSort}>
          {sortOrder === "asc" ? <FaSortAlphaDown /> : <FaSortAlphaDownAlt />}
        </Button>
        <Popover>
          <PopoverTrigger>
            <Button>
              <FaFilter />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Filter Options</PopoverHeader>
            <PopoverBody>
              <FormControl>
                <Checkbox
                  isChecked={showAlignmentFilters}
                  onChange={(e) => setShowAlignmentFilters(e.target.checked)}
                >
                  Filter by Alignment
                </Checkbox>
                <Collapse in={showAlignmentFilters}>
                  <Stack direction="row" my={3}>
                    {" "}
                    <Button size="sm" onClick={clearAllAlignments}>
                      clear all
                    </Button>
                  </Stack>

                  <CheckboxGroup
                    value={alignmentFilter}
                    onChange={handleAlignmentFilterChange}
                  >
                    <VStack alignItems="start" mt={3}>
                      <Checkbox value="chaotic evil">Chaotic Evil</Checkbox>
                      <Checkbox value="neutral evil">Neutral Evil</Checkbox>
                      <Checkbox value="lawful evil">Lawful Evil</Checkbox>
                      <Checkbox value="chaotic neutral">
                        Chaotic Neutral
                      </Checkbox>
                      <Checkbox value="neutral">Neutral</Checkbox>
                      <Checkbox value="lawful neutral">Lawful Neutral</Checkbox>
                      <Checkbox value="chaotic good">Chaotic Good</Checkbox>
                      <Checkbox value="neutral good">Neutral Good</Checkbox>
                      <Checkbox value="lawful good">Lawful Good</Checkbox>
                    </VStack>
                  </CheckboxGroup>
                </Collapse>
              </FormControl>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>

      <SimpleGrid columns={[1, 2, 4, 5, 6]} spacing={5}>
        {/* filter the npcs list based on search, filter, and sort selections and then map filtered list to a card on grid */}
        {npcs &&
          npcs
            .filter(
              (n) =>
                n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                n.race.toLowerCase().includes(searchTerm.toLowerCase()) ||
                n.alignment.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter((n) => {
              if (alignmentFilter.length === 0) {
                return true;
              } else {
                return alignmentFilter.includes(n.alignment.toLowerCase());
              }
            })
            .sort((a, b) => {
              if (sortOrder === "asc") {
                return a.name.localeCompare(b.name);
              } else {
                return b.name.localeCompare(a.name);
              }
            })
            .map((n) => (
              <NpcCard
                key={n.id}
                id={n.id}
                image={n.image}
                name={n.name}
                onDelete={handleDelete}
              ></NpcCard>
            ))}

        <NpcCreate
          onCreate={handleCreate}
          onSliderChange={handleSliderChange}
          isLoading={isLoading}
        ></NpcCreate>
      </SimpleGrid>
    </Box>
  );
};

export default NpcGrid;
