import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import ItemCard from "./ItemCard";
import ItemCreate from "./ItemCreate";
import buildItem from "../../modules/buildItem";

const ItemGrid = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sliderValues, setSliderValues] = useState({
    alignment: 5,
  });

  // Fetches the initial data from the db
  useEffect(() => {
    const fetchItems = async () => {
      const itemDocs = await getDocs(collection(db, "items"));
      setItems(itemDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchItems();
  }, []);

  // Creates a new item in the db and then updates local state variable
  const handleCreate = async () => {
    setIsLoading(true);
    const itemData = await buildItem(sliderValues);

    try {
      const createdItemRef = await addDoc(collection(db, "items"), itemData);
      setItems([...items, { id: createdItemRef.id, ...itemData }]);
    } catch (error) {
      console.error("Error creating ITEM:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Deletes specific item in db as well as any relationships it has, and then updates local state variable
  const handleDelete = async (id) => {
    try {
      // Delete an ITEM in Firestore
      await deleteDoc(doc(db, "items", id));

      // fetch npc_item relations for the deleted Item
      const npcItemsQuery = query(
        collection(db, "npc_items"),
        where("item_id", "==", id)
      );
      const npcItemsQuerySnapshot = await getDocs(npcItemsQuery);

      // iterate over the fetched related npc_items and delete them one by one
      for (const npcItemDoc of npcItemsQuerySnapshot.docs) {
        await deleteDoc(doc(db, "npc_items", npcItemDoc.id));
      }

      // Update the local state to remove the deleted item
      setItems(items.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error deleting ITEM:", error);
    }
  };

  // Recieves the slider values and updates the local state variable
  const handleSliderChange = (name, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <SimpleGrid columns={[1, 2, 4, 5, 6]} spacing={5}>
      {items &&
        items.map((n) => (
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
