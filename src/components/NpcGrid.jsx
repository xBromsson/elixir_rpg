import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import NpcCard from "./NpcCard";
import NpcCreate from "./NpcCreate";
import buildNpcTesting from "../modules/buildNpcTesting";

const NpcGrid = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [npcs, setNpcs] = useState([]);
  const [sliderValues, setSliderValues] = useState({ alignment: 1 });

  const handleSliderChange = (name, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Fetch existing NPCs from the server
    setIsLoading(true);
    fetch("http://localhost:3000/npcs")
      .then((response) => response.json())
      .then((data) => setNpcs(data))
      .catch((error) => console.error("Error fetching NPCs:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreate = async () => {
    setIsLoading(true);
    const npcData = await buildNpcTesting(sliderValues.alignment);

    // Create an NPC on the server-side
    fetch("http://localhost:3000/npcs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(npcData),
    })
      .then((response) => response.json())
      .then((createdNpc) => setNpcs([...npcs, createdNpc]))
      .catch((error) => console.error("Error creating NPC:", error))
      .finally(() => setIsLoading(false));
  };

  const handleDelete = (id) => {
    // Delete an NPC on the server-side
    fetch(`http://localhost:3000/npcs/` + id, {
      method: "DELETE",
    })
      .then(() => setNpcs(npcs.filter((e) => e.id !== id)))
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
          race={n.race}
          quote={n.quote}
          onDelete={handleDelete}
        ></NpcCard>
      ))}
      {!isLoading ? (
        <NpcCreate
          onCreate={handleCreate}
          onSliderChange={handleSliderChange}
        ></NpcCreate>
      ) : (
        <Skeleton></Skeleton>
      )}
    </SimpleGrid>
  );
};

export default NpcGrid;
