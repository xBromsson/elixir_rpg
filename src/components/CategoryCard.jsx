import {
  Card,
  CardBody,
  Circle,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";

const Props = {
  name: "",
  count: null,
};
const CategoryCard = ({ name, count }) => {
  return (
    <Card textColor={"gray.400"}>
      <CardBody>
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={"2xl"} fontWeight={700}>
            {name}
          </Heading>
          <Circle size={"25px"} bg={"gray.300"}>
            <Text color={"gray.600"} fontSize={"1xl"} fontWeight={700}>
              {count}
            </Text>
          </Circle>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default CategoryCard;
