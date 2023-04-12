import { Card, CardBody, Heading } from "@chakra-ui/react";

const CategoryCard = ({ name }) => {
  return (
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
  );
};

export default CategoryCard;
