import { Container, Image, Heading, Text, Center } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

function NpcDetail() {
  const npc = useLoaderData();

  return (
    <Container>
      <Image src={npc.image}></Image>
      <Heading as="h1" size="lg">
        {npc.name}
      </Heading>
      <Heading as="h2" size="md">
        {npc.race}
      </Heading>
      <Heading as="h3" size="sm">
        {npc.occupation}
      </Heading>

      <Text as={"i"} textAlign={"center"}>
        "{npc.quote}"
      </Text>

      <Text>{npc.personality}</Text>
    </Container>
  );
}

export default NpcDetail;

export async function loader({ params }) {
  const data = await fetch(`http://localhost:3000/npcs/${params.id}`);
  return data;
}
