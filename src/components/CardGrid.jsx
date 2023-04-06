import { SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";
import NpcCard from "./NpcCard";
import { CreatorCard } from "./CreatorCard";
import useAI from "../hooks/useAi";

const npcs = [
  {
    name: "Grommash",
    race: "Half-Orc",
    flavor:
      "I may be half-human, but I've got twice the strength of any orc you'll ever meet!",
    image:
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jXq1jagmrAh2SvVmFUvvOHlj/user-hQ25tTtiKrYA6dfBSPoVNxn0/img-7sZ1mkghnb0IybGOqxC8fO2l.png?st=2023-04-06T19%3A11%3A28Z&se=2023-04-06T21%3A11%3A28Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-06T15%3A54%3A41Z&ske=2023-04-07T15%3A54%3A41Z&sks=b&skv=2021-08-06&sig=WW9AUsxQlCIeAdqfOqQZeUS4lNH0G42X1yule8O5kpU%3D",
  },
];

const CardGrid = () => {
  const { response } = useAI(
    "content",
    "create a fantasy character name. It must be first name and last name only",
    1
  );
  const [npc, setNpc] = useState(npcs);

  const handleCreate = () => {
    setNpc([...npc, { name: response }]);
  };

  return (
    <SimpleGrid columns={4} spacing={3}>
      {npc.map((n) => (
        <NpcCard
          key={n.name}
          name={n.name}
          race={n.race}
          flavor={n.flavor}
          image={n.image}
        ></NpcCard>
      ))}
      <CreatorCard onCreate={handleCreate}></CreatorCard>
    </SimpleGrid>
  );
};

export default CardGrid;
