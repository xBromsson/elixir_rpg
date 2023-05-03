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
  Divider,
  Spacer,
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
            <Card align={"center"} overflow={"hidden"}>
              {" "}
              <Image width={"100%"} src={item.image}></Image>
              <CardFooter>
                {" "}
                <Text as={"i"}>"something about the item here"</Text>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem px={5} area={"right"}>
            <Card h={"100%"}>
              <CardBody>
                {" "}
                <Stack w={"50%"}>
                  <HStack>
                    <Heading as="h1" size="xl">
                      {item.name}
                    </Heading>
                  </HStack>
                  <Divider width={"65%"} />
                  <HStack>
                    <Heading size={"md"}>type</Heading>
                    <Text size="md">| value</Text>
                    <Text fontSize={"md"}>| something else</Text>
                  </HStack>
                  <Spacer />
                  <Spacer />
                  <Heading fontSize={"md"}>Description</Heading>
                  <Text>{item.description}</Text>
                  <Spacer />
                  <Heading fontSize={"md"}>Personality</Heading>
                  <Text>text</Text>
                  <Spacer />
                  <Heading fontSize={"md"}>Quirk</Heading>
                  <Text>text</Text>
                  <Spacer />
                  <Heading fontSize={"md"}>Plot Hook</Heading>
                  <Text>text</Text> <Spacer />
                  <Heading fontSize={"md"}>Secret</Heading>
                  <Text>text</Text>
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
