import { Button, Card, CardBody, Center, Text } from "@chakra-ui/react";

const Props = {
  onCreate: () => {},
};

export const CreatorCard = ({ onCreate }) => {
  return (
    <Card
      border={"solid"}
      borderWidth={2}
      borderStyle={"dashed"}
      opacity={"25%"}
      height={"100%"}
    >
      <CardBody>
        <Center h={"100%"}>
          <Button onClick={onCreate}>Create</Button>
        </Center>
      </CardBody>
    </Card>
  );
};
