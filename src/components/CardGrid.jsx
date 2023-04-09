import { SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import NpcCard from "./NpcCard";
import { CreatorCard } from "./CreatorCard";
import buildNpc from "../modules/buildNpc";

const npcs = [];

const CardGrid = () => {
  const [initial, setInitial] = useState(true);
  const [build, setBuild] = useState(true);
  const [npc, setNpc] = useState(npcs);

  useEffect(() => {
    !initial
      ? buildNpc()
          .then((res) => {
            setNpc([
              ...npc,
              { image: res[0], name: res[1], race: res[2], flavor: res[3] },
            ]);
          })
          .catch((err) => {
            console.log(error);
          })
      : setInitial(false);
  }, [build]);

  const handleCreate = () => {
    console.log("clicked");
    setBuild(!build);
  };

  return (
    <SimpleGrid columns={4} spacing={3}>
      {npc.map((n) => (
        <NpcCard
          key={n.name}
          image={n.image}
          name={n.name}
          race={n.race}
          flavor={n.flavor}
        ></NpcCard>
      ))}
      <CreatorCard onCreate={handleCreate}></CreatorCard>
    </SimpleGrid>
  );
};

export default CardGrid;
