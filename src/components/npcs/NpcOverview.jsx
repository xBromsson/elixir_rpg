import {
  Card,
  CardBody,
  Divider,
  HStack,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

const NpcOverview = ({ npc }) => {
  return (
    <Card>
      <CardBody>
        <Stack w={"100%%"}>
          <HStack>
            <Heading as="h1" size="lg">
              {npc.name}
            </Heading>
          </HStack>
          <HStack>
            <Text size={"md"}>{npc.race}</Text>
            <Text size="md">| {npc.occupation}</Text>
            <Text fontSize={"md"}>| {npc.alignment}</Text>
          </HStack>
          <Spacer />
          <Spacer />
          <Heading fontSize={"md"}>Back Story</Heading>
          <Text>{npc.definingmoment}</Text>
          <Spacer />
          <Heading fontSize={"md"}>Personality</Heading>
          <Text>{npc.personality}</Text>
          <Spacer />
          <Heading fontSize={"md"}>Quirk</Heading>
          <Text>{npc.personalityquirk}</Text>
          <Spacer />
          <Heading fontSize={"md"}>Plot Hook</Heading>
          <Text>{npc.plothook}</Text>
          <Spacer />
          <Heading fontSize={"md"}>Secret</Heading>
          <Text>{npc.secret}</Text>
          <Spacer />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default NpcOverview;
