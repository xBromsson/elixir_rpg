import { SimpleGrid } from "@chakra-ui/react";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    name: "Worlds",
    count: 1,
  },
  {
    name: "Cities",
    count: 1,
  },
  {
    name: "Buildings",
    count: 1,
  },
  {
    name: "NPCs",
    count: 5,
  },
  {
    name: "Items",
    count: 5,
  },
];

const CategoryGrid = () => {
  return (
    <SimpleGrid columns={1} spacing={5}>
      {categories.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          count={category.count}
        ></CategoryCard>
      ))}
    </SimpleGrid>
  );
};

export default CategoryGrid;