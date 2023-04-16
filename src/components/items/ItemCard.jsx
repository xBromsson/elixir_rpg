import { Card, Image, CardFooter, HStack, Text, Box } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ItemCard = ({ name, id, image, onDelete }) => {
  return (
    <Card borderRadius={3} height={"min-content"} overflow={"hidden"}>
      {" "}
      <Link to={"http://localhost:5173/items/" + id}>
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
