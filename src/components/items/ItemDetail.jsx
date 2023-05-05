import {
  Image,
  Heading,
  Text,
  Card,
  CardFooter,
  Grid,
  GridItem,
  CardBody,
  Stack,
  HStack,
  Container,
  Spacer,
  Badge,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const ItemDetail = () => {
  const { id, itemId } = useParams();
  const [item, setItem] = useState(null);

  //fetches the specific item data
  useEffect(() => {
    const fetchItem = async () => {
      const targetId = itemId || id;
      const itemDoc = await getDoc(doc(db, "items", targetId));
      setItem({ id: itemDoc.id, ...itemDoc.data() });
    };

    fetchItem();
  }, [id, itemId]);

  //written by gpt, should rewrite to make more sense
  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardBody>
        {" "}
        <Grid
          h={"100 vh"}
          templateAreas={`"left right"`}
          templateColumns={"20% 1fr"}
          templateRows={"1fr"}
        >
          <GridItem p={0} area={"left"}>
            <Card bg={"gray.800"} align={"center"} overflow={"hidden"}>
              {" "}
              <Image width={"100%"} src={item.image}></Image>
              <CardFooter>
                {" "}
                <Text as={"i"}>"something about the item here"</Text>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem px={5} area={"right"}>
            <Card bg={"gray.800"}>
              <CardBody>
                {" "}
                <Stack spacing={1}>
                  <Heading as="h1" size="xl">
                    {item.name}
                  </Heading>

                  <HStack>
                    <Badge size={"md"}>{item.type}</Badge>
                    <Badge size="md"> {item.rarity}</Badge>
                  </HStack>

                  <Stack spacing={5}>
                    <Spacer />
                    <Container>
                      <Heading fontSize={"md"}>Description</Heading>
                      <Text>{item.description}</Text>
                    </Container>
                    <Container>
                      <Heading fontSize={"md"}>Effects</Heading>
                      <Text>{item.effects}</Text>
                    </Container>
                    <Container>
                      <Heading fontSize={"md"}>Requirements</Heading>
                      <Text>{item.requirements}</Text>
                    </Container>
                  </Stack>

                  <Spacer />
                </Stack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default ItemDetail;
