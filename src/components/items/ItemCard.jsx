import { Card, Image, CardFooter, HStack, Text, Box } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { Link, useParams, useLocation } from "react-router-dom";

const ItemCard = ({ name, id, image, onDelete }) => {
  const { id: npcId } = useParams();
  const location = useLocation();

  const isNpcDetailRoute = location.pathname.includes("/npcs/");
  const linkPath = isNpcDetailRoute
    ? `/npcs/${npcId}/items/${id}`
    : `/items/${id}`;

  return (
    <Card borderRadius={3} height={"min-content"} overflow={"hidden"}>
      <Box position="relative" width="100%" maxWidth="300px">
        <Link to={linkPath}>
          <Image h={237} objectFit={"cover"} width={"100%"} src={image}></Image>
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

export default ItemCard;
