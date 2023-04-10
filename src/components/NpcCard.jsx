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
import { Link, useNavigate } from "react-router-dom";

const NpcCard = ({ id, name, race, flavor, image, onDelete }) => {
  return (
    <Card overflow={"hidden"}>
      <Link to={"/" + id}>
        <Image
          height={"150px"}
          objectFit={"cover"}
          objectPosition={"top"}
          src={image}
        ></Image>
      </Link>

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
            <Box onClick={() => onDelete(id)}>
              <FaTrash />
            </Box>
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default NpcCard;
