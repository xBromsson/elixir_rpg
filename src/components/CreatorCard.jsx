import { Card, CardBody, Center, Text } from "@chakra-ui/react";

export const CreatorCard = () => {
  return (
    <Card
      border={"solid"}
      borderWidth={2}
      borderStyle={"dashed"}
      opacity={"25%"}
    >
      <CardBody>
        <Center h={"100%"}>
          <Text colorScheme={"gray.100"} fontSize={"3xl"}>
            {" "}
            +
          </Text>
        </Center>
      </CardBody>
    </Card>
  );
};
