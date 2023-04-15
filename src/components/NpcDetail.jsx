import {
  Container,
  Image,
  Heading,
  Text,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

function NpcDetail() {
  const npc = useLoaderData();

  return (
    <SimpleGrid columns={2}>
      <Container>
        <Image src={npc.image}></Image>

        <Text as={"i"} textAlign={"center"}>
          "{npc.quote}"
        </Text>
        <Text fontSize={"xl"}>Appearance</Text>
        <Text>{npc.appearance}</Text>
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
  const data = await fetch(`http://localhost:3000/npcs/${params.id}`);
  return data;
}
