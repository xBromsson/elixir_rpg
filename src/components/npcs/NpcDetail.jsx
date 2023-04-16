import { Container, Image, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import ItemCard from "../items/ItemCard";

function NpcDetail() {
  const { items, ...npc } = useLoaderData();

  return (
    <SimpleGrid columns={2}>
      <Container>
        <Image src={npc.image}></Image>

        <Text as={"i"} textAlign={"center"}>
          "{npc.quote}"
        </Text>
        <Text fontSize={"xl"}>Appearance</Text>
        <Text>{npc.appearance}</Text>
        <Text fontSize={"xl"}>ITEMS</Text>
        <SimpleGrid columns={2}>
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
      </Container>
      <Container>
        <Heading as="h1" size="lg">
          {npc.name}
        </Heading>
        <Heading as="h2" size="md">
          {npc.race}
        </Heading>
        <Heading as="h3" size="sm">
          {npc.occupation}
        </Heading>
        <Heading as="h3" size="sm">
          {npc.alignment}
        </Heading>

        <Text fontSize={"xl"}>Back Story</Text>
        <Text>{npc.definingmoment}</Text>
        <Text fontSize={"xl"}>Personality</Text>
        <Text>{npc.personality}</Text>
        <Text fontSize={"xl"}>Plot Hook</Text>
        <Text>{npc.plothook}</Text>
        <Text fontSize={"xl"}>Quirk</Text>
        <Text>{npc.personalityquirk}</Text>
        <Text fontSize={"xl"}>Secret</Text>
        <Text>{npc.secret}</Text>
      </Container>
    </SimpleGrid>
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
