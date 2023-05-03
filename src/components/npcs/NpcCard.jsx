import { Card, Image, Text, Box } from "@chakra-ui/react";

import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const NpcCard = ({ name, id, image, onDelete }) => {
  return (
    <Card
      colorScheme="teal"
      borderRadius={3}
      height={"min-content"}
      overflow={"hidden"}
    >
      {" "}
      <Box position="relative" width="100%" maxWidth="300px">
        <Link to={"http://localhost:5173/npcs/" + id}>
          <Image src={image} alt="npc image" width="100%" objectFit="cover" />
        </Link>
        <Text
          position="absolute"
          left={2}
          bottom={2}
          fontWeight="bold"
          color="white"
          bg="rgba(0, 0, 0, 0.5)"
          p={1}
        >
          {name}
        </Text>
        <Box
          onClick={() => onDelete(id)}
          position="absolute"
          right={2}
          bottom={2}
          fontWeight="bold"
          color="white"
          bg="rgba(0, 0, 0, 0.5)"
          p={1}
        >
          <FaTrash size={13} />
        </Box>
      </Box>
    </Card>
  );
};

export default NpcCard;
