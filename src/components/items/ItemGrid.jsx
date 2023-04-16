import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import ItemCard from "./ItemCard";
import ItemCreate from "./ItemCreate";
import buildItem from "../../modules/buildItem";

const ItemGrid = () => {
  const [items, setItems] = useState(useLoaderData());
  const [isLoading, setIsLoading] = useState(false);
  const [sliderValues, setSliderValues] = useState({
    alignment: 5,
  });

  const handleSliderChange = (name, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    setIsLoading(true);
    const itemData = await buildItem(sliderValues);

    // Create an ITEM on the server-side
    fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then((response) => response.json())
      .then((createdItem) => setItems([...items, createdItem]))
      .catch((error) => console.error("Error creating ITEM:", error))
      .finally(() => setIsLoading(false));
  };

  const handleDelete = (id) => {
    // Delete an ITEM on the server-side
    fetch(`http://localhost:3000/items/` + id, {
      method: "DELETE",
    })
      .then(() => setItems(items.filter((e) => e.id !== id)))
      .catch((error) => console.error("Error deleting ITEM:", error));
  };

  return (
    <SimpleGrid columns={[1, 2, 4, 5, 6]} spacing={5}>
      {items.map((n) => (
        <ItemCard
          key={n.id}
          id={n.id}
          image={n.image}
          name={n.name}
          onDelete={handleDelete}
        ></ItemCard>
      ))}
      {!isLoading ? (
        <ItemCreate
          onCreate={handleCreate}
          onSliderChange={handleSliderChange}
        ></ItemCreate>
      ) : (
        <Skeleton></Skeleton>
      )}
    </SimpleGrid>
  );
};

export default ItemGrid;

export async function loader() {
  const data = await fetch(`http://localhost:3000/items/`);
  return data;
}
