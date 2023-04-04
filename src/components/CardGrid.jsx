import { Card, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

const npc = [
  {
    name: "Grommash",
    race: "Half-Orc",
    flavor:
      "I may be half-human, but I've got twice the strength of any orc you'll ever meet!",
  },
  {
    name: "Sylfa",
    race: "Elf",
    flavor:
      "The forest speaks to me, and I to it. Together, we'll protect our home.",
  },
  {
    name: "Drogan",
    race: "Dragonborn",
    flavor:
      "My fire breath can scorch a mountain, but my heart is as cold as the ice in my veins.",
  },
  {
    name: "Miriam",
    race: "Human",
    flavor:
      "I may not have magic or wings, but I've got a sharp wit and a quicker blade.",
  },
  {
    name: "Tahli",
    race: "Tiefling",
    flavor:
      "They say I'm cursed, but I say it's just my devilish charm at work.",
  },
];

const CardGrid = () => {
  const [npcCharacters, setNpcCharacters] = useState();

  return (
    <SimpleGrid columns={4} spacing={3} padding={5}>
      {npc.map((n) => (
        <Card
          textColor={"gray.400"}
          justifyContent="center"
          alignItems="center"
          h={100}
          key={n.name}
        >
          {n.name}
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default CardGrid;
