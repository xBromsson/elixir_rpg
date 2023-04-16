import { Container, Image, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

const ItemDetail = () => {
  return <div>ItemDetail</div>;
};

export default ItemDetail;

export async function loader({ params }) {
  const data = await fetch(`http://localhost:3000/items/${params.id}`);
  return data;
}
