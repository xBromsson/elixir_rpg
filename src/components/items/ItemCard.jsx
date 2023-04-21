import { Card, Image, CardFooter, HStack, Text, Box } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
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
      {" "}
      <Link to={linkPath}>
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

export default ItemCard;
