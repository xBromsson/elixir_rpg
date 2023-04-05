import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";

import { FaEdit } from "react-icons/fa";

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
      <CardFooter>
        <HStack>
          <FaEdit />
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default NpcCard;
