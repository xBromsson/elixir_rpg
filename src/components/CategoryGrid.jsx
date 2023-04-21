import { SimpleGrid, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import CategoryCard from "./CategoryCard";

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchCategories = async () => {
      try {
        const categoriesQuery = query(
          collection(db, "categories"),
          orderBy("name")
        );
        const querySnapshot = await getDocs(categoriesQuery);
        const categoriesData = querySnapshot.docs.map((doc) => doc.data());
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching Categories:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
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
