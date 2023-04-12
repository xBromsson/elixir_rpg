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
import { BiDetail } from "react-icons/bi";
import { Link, Outlet, useNavigate } from "react-router-dom";

const NpcCard = ({ id, name, race, quote, image, onDelete }) => {
  return (
    <Card height={"100%"} overflow={"hidden"}>
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
          <Text as={"i"}> {quote}</Text>
          <HStack justify={"end"}>
            <FaEdit />
            <Box onClick={() => onDelete(id)}>
              <FaTrash />
            </Box>
            <Link to={"/npcs/" + id}>
              <BiDetail />
            </Link>
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default NpcCard;
