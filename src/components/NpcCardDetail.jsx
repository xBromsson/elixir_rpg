import { Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

function NpcCardDetail() {
  const npcs = useLoaderData();

  return <Text>Npc Details... {npcs.name}</Text>;
}

export default NpcCardDetail;

export async function loader({ params }) {
  const data = await fetch(`http://localhost:5000/npcs/${params.id}`);
  return data;
}
