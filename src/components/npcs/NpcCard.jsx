import {
  Card,
  HStack,
  Image,
  Text,
  Box,
  CardFooter,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";

import { FaEdit, FaTrash } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import { Link } from "react-router-dom";

const NpcCard = ({ name, id, image, onDelete }) => {
  return (
    <Card borderRadius={3} height={"min-content"} overflow={"hidden"}>
      {" "}
      <Link to={"http://localhost:5173/npcs/" + id}>
        <Image
          h={150}
          objectFit={"cover"}
          objectPosition={"top"}
          src={image}
        ></Image>
      </Link>
      <CardFooter py={2} pr={2} justify={"space-between"}>
        {" "}
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
              <FaTrash size={13} />
            </Box>

            <FaEdit />
          </HStack>
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default NpcCard;
