import { SimpleGrid, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((res) => setCategories(res))
      .catch((err) => console.error("Error fetching Categories:", err))
      .finally(() => setIsLoading(false));
  }, []);

  return !isLoading ? (
    <SimpleGrid columns={1} spacing={5}>
      {categories.map((category) => (
        <CategoryCard key={category.name} name={category.name}></CategoryCard>
      ))}
    </SimpleGrid>
  ) : (
    <Spinner />
  );
};

export default CategoryGrid;
