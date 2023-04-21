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
import { useLoaderData } from "react-router-dom";
import ItemCard from "../items/ItemCard";

function NpcDetail() {
  const { items, ...npc } = useLoaderData();

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

export async function loader({ params }) {
  const npcResponse = await fetch(`http://localhost:3000/npcs/${params.id}`);
  const npcData = await npcResponse.json();

  const npcItemsResponse = await fetch(
    `http://localhost:3000/npc_items?npc_id=${params.id}` // Use the correct key here
  );
  const npcItemsData = await npcItemsResponse.json();

  const itemIds = npcItemsData.map((npcItem) => npcItem.item_id); // Use the correct key here

  const itemsPromises = itemIds.map(async (itemId) => {
    const itemResponse = await fetch(`http://localhost:3000/items/${itemId}`);
    return itemResponse.json();
  });

  const items = await Promise.all(itemsPromises);

  return { ...npcData, items };
}
