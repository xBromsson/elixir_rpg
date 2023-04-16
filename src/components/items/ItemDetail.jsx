import { Container, Image, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const ItemDetail = () => {
  const [item, setItem] = useState(useLoaderData());

  return (
    <SimpleGrid columns={2}>
      <Container>
        <Image src={item.image}></Image>
      </Container>
      <Container>
        <Heading as="h1" size="lg">
          {item.name}
        </Heading>
        <Text>{item.description}</Text>
      </Container>
    </SimpleGrid>
  );
};

export default ItemDetail;

export async function loader({ params }) {
  const data = await fetch(`http://localhost:3000/items/${params.id}`);
  return data;
}
