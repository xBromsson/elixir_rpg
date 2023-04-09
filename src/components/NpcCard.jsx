import {
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";

import { FaEdit, FaTrash } from "react-icons/fa";

const onDelete = (id) => {};

const NpcCard = ({ name, race, flavor, image, onDelete }) => {
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
            <Box onClick={() => onDelete(name)}>
              <FaTrash />
            </Box>
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default NpcCard;
