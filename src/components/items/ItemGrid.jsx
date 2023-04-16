import { SimpleGrid } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import ItemCard from "./ItemCard";
import ItemCreate from "./ItemCreate";

const ItemGrid = () => {
  const [items, setItems] = useState(useLoaderData());
  console.log(items);

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {};

  const handleCreate = () => {};

  const handleSliderChange = () => {};

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
