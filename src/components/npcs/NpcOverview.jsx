import {
  Badge,
  Card,
  CardBody,
  Container,
  HStack,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

const NpcOverview = ({ npc }) => {
  return (
    <Card bg={"gray.800"}>
      <CardBody>
        <Stack spacing={1}>
          <Heading as="h1" size="lg">
            {npc.name}
          </Heading>
          <HStack>
            <Badge size={"md"}>{npc.race}</Badge>
            <Badge size="md"> {npc.occupation}</Badge>
            <Badge size={"md"}> {npc.alignment}</Badge>
          </HStack>
        </Stack>

        <Stack spacing={5}>
          <Spacer />
          <Container>
            <Heading fontSize={"md"}>Back Story</Heading>
            <Text>{npc.definingmoment}</Text>
          </Container>
          <Container>
            <Heading fontSize={"md"}>Personality</Heading>
            <Text>{npc.personality}</Text>
          </Container>
          <Container>
            <Heading fontSize={"md"}>Quirk</Heading>
            <Text>{npc.personalityquirk}</Text>
          </Container>
          <Container>
            <Heading fontSize={"md"}>Plot Hook</Heading>
            <Text>{npc.plothook}</Text>
          </Container>
          <Container>
            <Heading fontSize={"md"}>Secret</Heading>
            <Text>{npc.secret}</Text>
          </Container>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default NpcOverview;
