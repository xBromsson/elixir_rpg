import {
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
  Flex,
  Box,
  CardFooter,
} from "@chakra-ui/react";

import { FaEdit, FaTrash } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import { Link, Outlet, useNavigate } from "react-router-dom";

const NpcCard = ({ name, id, image, onDelete }) => {
  return (
    <Card borderRadius={3} height={"min-content"} overflow={"hidden"}>
      <Image
        h={150}
        objectFit={"cover"}
        objectPosition={"top"}
        src={image}
      ></Image>
      <CardFooter justify={"space-between"}>
        <Text
          alignSelf={"start"}
          whiteSpace={"nowrap"}
          textOverflow={"clip"}
          overflow={"hidden"}
        >
          {name}
        </Text>
        <HStack justify={"space-between"}>
          <HStack justify={"end"}>
            <Box onClick={() => onDelete(id)}>
              <FaTrash />
            </Box>
            <FaEdit />

            <Link to={"/npcs/" + id}>
              <BiDetail />
            </Link>
          </HStack>
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default NpcCard;
