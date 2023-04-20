import {
  Container,
  Image,
  Heading,
  Text,
  SimpleGrid,
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
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const ItemDetail = () => {
  const [item, setItem] = useState(useLoaderData());

  return (
    <Card>
      <CardBody>
        {" "}
        <Grid
          h={"100 vh"}
          templateAreas={`"left right"`}
          templateColumns={"35% 1fr"}
          templateRows={"1fr"}
        >
          <GridItem p={5} area={"left"}>
            <Card align={"center"} overflow={"hidden"}>
              {" "}
              <Image width={"100%"} src={item.image}></Image>
              <CardFooter>
                {" "}
                <Text as={"i"}>"something about the item here"</Text>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem p={5} area={"right"}>
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

export async function loader({ params }) {
  const data = await fetch(`http://localhost:3000/items/${params.id}`);
  return data;
}
