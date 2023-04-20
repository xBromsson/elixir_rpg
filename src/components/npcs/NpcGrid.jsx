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
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Checkbox,
  CheckboxGroup,
  VStack,
  FormControl,
  FormLabel,
  Stack,
  Collapse,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import {
  FaFilter,
  FaSort,
  FaSearch,
  FaSortAlphaDownAlt,
  FaSortAlphaDown,
} from "react-icons/fa";
import NpcCard from "./NpcCard";
import NpcCreate from "./NpcCreate";
import buildNpc from "../../modules/buildNpc";
import buildItem from "../../modules/buildItem";

const NpcGrid = () => {
  const [npcs, setNpcs] = useState(useLoaderData());
  const [isLoading, setIsLoading] = useState(false);
  const [sliderValues, setSliderValues] = useState({
    alignment: "neutral",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [alignmentFilter, setAlignmentFilter] = useState([]);
  const [showAlignmentFilters, setShowAlignmentFilters] = useState(false);

  const handleSliderChange = (name, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    setIsLoading(true);
    const npcData = await buildNpc(sliderValues);
    const itemData = await buildItem(sliderValues);

    // Create an NPC on the server-side
    fetch("http://localhost:3000/npcs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(npcData),
    })
      .then((response) => response.json())
      .then(async (createdNpc) => {
        await fetch("http://localhost:3000/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        })
          .then((response) => response.json())
          .then(async (createdItem) => {
            // Create an entry in the npc_items table on the server-side
            await fetch("http://localhost:3000/npc_items", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                npc_id: createdNpc.id,
                item_id: createdItem.id,
              }),
            });
          });
        setNpcs([...npcs, createdNpc]);
      })
      .catch((error) => console.error("Error creating NPC:", error))
      .finally(() => setIsLoading(false));
  };

  const handleDelete = (id) => {
    // Delete an NPC on the server-side
    fetch(`http://localhost:3000/npcs/` + id, {
      method: "DELETE",
    })
      .then(() => {
        // Fetch npc_item relations for the deleted NPC
        fetch(`http://localhost:3000/npc_items?npc_id=` + id)
          .then((response) => response.json())
          .then((npcItems) => {
            // Iterate over the fetched npc_items and delete them one by one
            npcItems.forEach((npcItem) => {
              fetch(`http://localhost:3000/npc_items/` + npcItem.id, {
                method: "DELETE",
              }).catch((error) =>
                console.error("Error deleting npc_item relation:", error)
              );
            });
            // Update the local state to remove the deleted NPC
            setNpcs(npcs.filter((e) => e.id !== id));
          })
          .catch((error) =>
            console.error("Error fetching npc_item relations:", error)
          );
      })
      .catch((error) => console.error("Error deleting NPC:", error));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const handleAlignmentFilterChange = (values) => {
    setAlignmentFilter(values);
  };

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
        {/* filter the npcs list based on the search term, then map filtered list to a card on grid */}
        {npcs
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

export async function loader() {
  const data = await fetch(`http://localhost:3000/npcs`);
  return data;
}
