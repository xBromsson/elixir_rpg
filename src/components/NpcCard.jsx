import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";

const Props = {
  name: "",
  race: "",
  flavor: "",
};

const NpcCard = ({ name, race, flavor }) => {
  return (
    <Card>
      <CardHeader>
        <Heading as="h2" size="md">
          {name}
        </Heading>
        <Text>{race}</Text>
      </CardHeader>
      <CardBody>
        <Text> {flavor}</Text>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default NpcCard;
