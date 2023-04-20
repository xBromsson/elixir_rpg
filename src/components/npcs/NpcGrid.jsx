import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import NpcCard from "./NpcCard";
import NpcCreate from "./NpcCreate";
import buildNpc from "../../modules/buildNpc";
import buildItem from "../../modules/buildItem";

const NpcGrid = () => {
  const [npcs, setNpcs] = useState(useLoaderData());
  const [isLoading, setIsLoading] = useState(false);
  const [sliderValues, setSliderValues] = useState({
    alignment: "neutral",
  });

  const handleSliderChange = (name, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   // Fetch existing NPCs from the server
  // //   setIsLoading(true);
  // //   fetch("http://localhost:3000/npcs")
  // //     .then((response) => response.json())
  // //     .then((data) => setNpcs(data))
  // //     .catch((error) => console.error("Error fetching NPCs:", error))
  // //     .finally(() => setIsLoading(false));
  // // }, []);

  const handleCreate = async () => {
    setIsLoading(true);
    const npcData = await buildNpc(sliderValues);
    const itemData = await buildItem(sliderValues);

    // Create an NPC on the server-side
    fetch("http://localhost:3000/npcs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(npcData),
    })
      .then((response) => response.json())
      .then(async (createdNpc) => {
        await fetch("http://localhost:3000/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        })
          .then((response) => response.json())
          .then(async (createdItem) => {
            // Create an entry in the npc_items table on the server-side
            await fetch("http://localhost:3000/npc_items", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                npc_id: createdNpc.id,
                item_id: createdItem.id,
              }),
            });
          });
        setNpcs([...npcs, createdNpc]);
      })
      .catch((error) => console.error("Error creating NPC:", error))
      .finally(() => setIsLoading(false));
  };

  const handleDelete = (id) => {
    // Delete an NPC on the server-side
    fetch(`http://localhost:3000/npcs/` + id, {
      method: "DELETE",
    })
      .then(() => {
        // Fetch npc_item relations for the deleted NPC
        fetch(`http://localhost:3000/npc_items?npc_id=` + id)
          .then((response) => response.json())
          .then((npcItems) => {
            // Iterate over the fetched npc_items and delete them one by one
            npcItems.forEach((npcItem) => {
              fetch(`http://localhost:3000/npc_items/` + npcItem.id, {
                method: "DELETE",
              }).catch((error) =>
                console.error("Error deleting npc_item relation:", error)
              );
            });
            // Update the local state to remove the deleted NPC
            setNpcs(npcs.filter((e) => e.id !== id));
          })
          .catch((error) =>
            console.error("Error fetching npc_item relations:", error)
          );
      })
      .catch((error) => console.error("Error deleting NPC:", error));
  };

  return (
    <SimpleGrid columns={[1, 2, 4, 5, 6]} spacing={5}>
      {npcs.map((n) => (
        <NpcCard
          key={n.id}
          id={n.id}
          image={n.image}
          name={n.name}
          onDelete={handleDelete}
        ></NpcCard>
      ))}

      <NpcCreate
        onCreate={handleCreate}
        onSliderChange={handleSliderChange}
        isLoading={isLoading}
      ></NpcCreate>
    </SimpleGrid>
  );
};

export default NpcGrid;

export async function loader() {
  const data = await fetch(`http://localhost:3000/npcs`);
  return data;
}
