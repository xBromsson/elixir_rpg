import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import NpcCard from "./NpcCard";
import { CreatorCard } from "./CreatorCard";
import buildNpc from "../modules/buildNpc";

const CardGrid = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [npcs, setNpcs] = useState([]);

  useEffect(() => {
    // Fetch existing NPCs from the server
    setIsLoading(true);
    fetch("http://localhost:5000/npcs")
      .then((response) => response.json())
      .then((data) => setNpcs(data))
      .catch((error) => console.error("Error fetching NPCs:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreate = async () => {
    setIsLoading(true);
    const npcData = await buildNpc();
    const newNpc = {
      image: npcData[0],
      name: npcData[1],
      race: npcData[2],
      flavor: npcData[3],
    };

    // Create an NPC on the server-side
    fetch("http://localhost:5000/npcs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNpc),
    })
      .then((response) => response.json())
      .then((createdNpc) => setNpcs([...npcs, createdNpc]))
      .catch((error) => console.error("Error creating NPC:", error))
      .finally(() => setIsLoading(false));
  };

  const handleDelete = (id) => {
    // Delete an NPC on the server-side
    fetch(`http://localhost:5000/npcs/` + id, {
      method: "DELETE",
    })
      .then(() => setNpcs(npcs.filter((e) => e.id !== id)))
      .catch((error) => console.error("Error deleting NPC:", error));
  };

  //   return (
  //     <SimpleGrid columns={4} spacing={3}>
  //       {npc.map((n) => (
  //         <NpcCard
  //           key={n.id}
  //           image={n.image}
  //           name={n.name}
  //           race={n.race}
  //           flavor={n.flavor}
  //           onDelete={handleDelete}
  //         ></NpcCard>
  //       ))}
  //       {!isLoading ? (
  //         <CreatorCard onCreate={handleCreate}></CreatorCard>
  //       ) : (
  //         <Skeleton height={"350px"}></Skeleton>
  //       )}
  //     </SimpleGrid>
  //   );
  // };

  // const npcs = [];

  // const CardGrid = () => {
  //   const [initial, setInitial] = useState(true);
  //   const [build, setBuild] = useState(true);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [npc, setNpc] = useState(npcs);

  //   useEffect(() => {
  //     !initial
  //       ? (setIsLoading(true),
  //         buildNpc()
  //           .then((res) => {
  //             setNpc([
  //               ...npc,
  //               { image: res[0], name: res[1], race: res[2], flavor: res[3] },
  //             ]);
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           })).finally(() => {
  //           setIsLoading(false);
  //         })
  //       : setInitial(false);
  //   }, [build]);

  //   const handleCreate = () => {
  //     console.log("clicked");
  //     setBuild(!build);
  //   };

  //   const handleDelete = (id) => {
  //     console.log("deleted", id);
  //     setNpc(npc.filter((e) => e.name !== id));
  //   };

  //   console.log(npc);

  return (
    <SimpleGrid columns={4} spacing={3}>
      {npcs.map((n) => (
        <NpcCard
          key={n.id}
          id={n.id}
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
        <Skeleton height={"350px"}></Skeleton>
      )}
    </SimpleGrid>
  );
};

export default CardGrid;
