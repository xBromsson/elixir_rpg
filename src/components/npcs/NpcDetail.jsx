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
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import ItemCard from "../items/ItemCard";

function NpcDetail() {
  const { items, ...npc } = useLoaderData();

  return (
    <Card>
      <CardBody>
        {" "}
        <Grid
          h={"100 vh"}
          templateAreas={`"left right"
                    "items items"`}
          templateColumns={"35% 1fr"}
          templateRows={"1fr 1fr"}
        >
          <GridItem p={5} area={"left"}>
            <Card align={"center"} overflow={"hidden"}>
              {" "}
              <Image width={"100%"} src={npc.image}></Image>
              <CardFooter>
                {" "}
                <Text as={"i"}>"{npc.quote}"</Text>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem p={5} area={"right"}>
            <Card h={"100%"}>
              <CardBody>
                {" "}
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
                  <Text>{npc.plothook}</Text> <Spacer />
                  <Heading fontSize={"md"}>Secret</Heading>
                  <Text>{npc.secret}</Text>
                  <Spacer />
                </Stack>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem area={"items"}>
            <Card w={"50%"}>
              <CardHeader>
                {" "}
                <Heading as="h1" size="xl">
                  Items:
                </Heading>
              </CardHeader>

              <CardBody>
                <SimpleGrid columns={4}>
                  {" "}
                  {items.map((item) => {
                    return (
                      <ItemCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                      ></ItemCard>
                    );
                  })}
                </SimpleGrid>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </CardBody>
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
