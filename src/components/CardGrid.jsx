import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import NpcCard from "./NpcCard";
import { CreatorCard } from "./CreatorCard";
import buildNpc from "../modules/buildNpc";

const npcs = [];

const CardGrid = () => {
  const [initial, setInitial] = useState(true);
  const [build, setBuild] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [npc, setNpc] = useState(npcs);

  useEffect(() => {
    !initial
      ? (setIsLoading(true),
        buildNpc()
          .then((res) => {
            setNpc([
              ...npc,
              { image: res[0], name: res[1], race: res[2], flavor: res[3] },
            ]);
          })
          .catch((err) => {
            console.log(err);
          })).finally(() => {
          setIsLoading(false);
        })
      : setInitial(false);
  }, [build]);

  const handleCreate = () => {
    console.log("clicked");
    setBuild(!build);
  };

  const handleDelete = (id) => {
    console.log("deleted", id);
    setNpc(npc.filter((e) => e.name !== id));
  };

  console.log(npc);

  return (
    <SimpleGrid columns={4} spacing={3}>
      {npc.map((n) => (
        <NpcCard
          key={n.name}
          image={n.image}
          name={n.name}
          race={n.race}
          flavor={n.flavor}
          onDelete={handleDelete}
        ></NpcCard>
      ))}
      {!isLoading ? (
        <CreatorCard onCreate={handleCreate}></CreatorCard>
      ) : (
        <Skeleton></Skeleton>
      )}
    </SimpleGrid>
  );
};

export default CardGrid;
