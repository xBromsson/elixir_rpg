import {
  Stack,
  StackDivider,
  Divider,
  Box,
  Container,
  Image,
  Heading,
  Text,
  SimpleGrid,
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  HStack,
  Spacer,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import ItemCard from "../items/ItemCard";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function NpcDetail() {
  const { id } = useParams();
  const [npc, setNpc] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchNpcAndItems = async () => {
      const npcDoc = await getDoc(doc(db, "npcs", id));
      setNpc({ id: npcDoc.id, ...npcDoc.data() });

      const npcItemsQuery = query(
        collection(db, "npc_items"),
        where("npc_id", "==", id)
      );
      const npcItemsQuerySnapshot = await getDocs(npcItemsQuery);
      const itemIds = npcItemsQuerySnapshot.docs.map(
        (doc) => doc.data().item_id
      );

      const itemDocs = await Promise.all(
        itemIds.map((itemId) => getDoc(doc(db, "items", itemId)))
      );
      setItems(
        itemDocs.map((itemDoc) => ({ id: itemDoc.id, ...itemDoc.data() }))
      );
    };

    fetchNpcAndItems();
  }, [id]);

  if (!npc || !items.length) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <Grid
        h={"100 vh"}
        templateAreas={`"left right"`}
        templateColumns={"35% 1fr"}
        templateRows={"1fr"}
      >
        <GridItem p={5} area={"left"}>
          <Card align={"center"} overflow={"hidden"}>
            <Image width={"100%"} src={npc.image}></Image>
            <CardFooter>
              <Text as={"i"}>"{npc.quote}"</Text>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem p={5} area={"right"}>
          <Tabs variant="enclosed">
            <TabList mb="1em">
              <Tab>Overview</Tab>
              <Tab>Items</Tab>
              <Tab>Notes</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {/* Overview Tab */}
                <Card>
                  <CardBody>
                    <Stack w={"50%"}>
                      <HStack>
                        <Heading as="h1" size="xl">
                          {npc.name}
                        </Heading>
                      </HStack>
                      <Divider width={"65%"} />
                      <HStack>
                        <Heading size={"md"}>{npc.race}</Heading>
                        <Text size="md">| {npc.occupation}</Text>
                        <Text fontSize={"md"}>| {npc.alignment}</Text>
                      </HStack>
                      <Spacer />
                      <Spacer />
                      <Heading fontSize={"md"}>Back Story</Heading>
                      <Text>{npc.definingmoment}</Text>
                      <Spacer />
                      <Heading fontSize={"md"}>Personality</Heading>
                      <Text>{npc.personality}</Text>
                      <Spacer />
                      <Heading fontSize={"md"}>Quirk</Heading>
                      <Text>{npc.personalityquirk}</Text>
                      <Spacer />
                      <Heading fontSize={"md"}>Plot Hook</Heading>
                      <Text>{npc.plothook}</Text>
                      <Spacer />
                      <Heading fontSize={"md"}>Secret</Heading>
                      <Text>{npc.secret}</Text>
                      <Spacer />
                    </Stack>
                  </CardBody>
                </Card>
              </TabPanel>
              <TabPanel>
                {/* Items Tab */}
                <SimpleGrid columns={[1, 2, 4, 5]} spacing={5}>
                  {items.map((item) => (
                    <ItemCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      image={item.image}
                    ></ItemCard>
                  ))}
                </SimpleGrid>
              </TabPanel>
              <TabPanel>
                {/* Notes Tab */}
                {/* Empty for now */}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </Card>
  );
}

export default NpcDetail;
