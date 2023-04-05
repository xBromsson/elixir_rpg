import {
  Card,
  CardBody,
  Center,
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
    <Card>
      <CardBody>
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={"2xl"} fontWeight={700}>
            {name}
          </Heading>
          <Center size={"25px"}>
            <Text fontSize={"1xl"} fontWeight={700}>
              {count}
            </Text>
          </Center>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default CategoryCard;
