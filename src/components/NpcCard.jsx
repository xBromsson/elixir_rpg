import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  HStack,
  Heading,
  Image,
  Text,
  Flex,
  VStack,
} from "@chakra-ui/react";

import { FaEdit } from "react-icons/fa";

const Props = {
  name: "",
  race: "",
  flavor: "",
  image: "",
};

const NpcCard = ({ name, race, flavor, image }) => {
  return (
    <Card overflow={"hidden"}>
      <Image
        height={"150px"}
        objectFit={"cover"}
        objectPosition={"top"}
        src={image}
      ></Image>

      <CardBody>
        <Flex
          flexDirection={"column"}
          justifyContent={"space-between"}
          height={"100%"}
        >
          <Heading as="h2" size="md">
            {name}
          </Heading>
          <Text>{race}</Text>
          <Text as={"i"}> {flavor}</Text>
          <HStack justify={"end"}>
            <FaEdit />
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default NpcCard;
