import { SimpleGrid } from "@chakra-ui/react";
import ItemCard from "../items/ItemCard";
import { useOutletContext } from "../../modules/OutletContext";

const NpcItems = () => {
  const { items } = useOutletContext();
  return (
    <SimpleGrid columns={[1, 2, 4, 5]} spacing={5}>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          id={item.id}
          name={item.name}
          image={item.image}
        ></ItemCard>
      ))}
    </SimpleGrid>
  );
};

export default NpcItems;
