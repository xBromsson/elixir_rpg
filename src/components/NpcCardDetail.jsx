import { Container, Image, Heading, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

function NpcCardDetail() {
  const npc = useLoaderData();

  return (
    <Container>
      <Image src={npc.image}></Image>
      <Heading as="h2" size="md">
        {npc.name}
      </Heading>
      <Heading as="h2" size="md">
        {npc.race}
      </Heading>
      <Text>{npc.occupation}</Text>
      <Text>{npc.quote}</Text>

      <Text>{npc.backstory}</Text>
    </Container>
  );
}

export default NpcCardDetail;

export async function loader({ params }) {
  const data = await fetch(`http://localhost:5000/npcs/${params.id}`);
  return data;
}
