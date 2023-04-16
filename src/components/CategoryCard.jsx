import { Card, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CategoryCard = ({ name }) => {
  return (
    <Link to={"http://localhost:5173/" + name}>
      <Card
        py={2}
        h={"min-content"}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={2}
      >
        <Heading fontSize={"xl"} fontWeight={500}>
          {name}
        </Heading>
      </Card>
    </Link>
  );
};

export default CategoryCard;
