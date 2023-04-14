import {
  Button,
  Card,
  CardBody,
  Box,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Heading,
} from "@chakra-ui/react";

import { GiPotionBall } from "react-icons/gi";
import NpcSlider from "./NpcSlider";

const Props = {
  onCreate: () => {},
};

function NpcCreate({ onCreate }) {
  return (
    <Card
      border={"solid"}
      borderWidth={2}
      borderStyle={"dashed"}
      height={"100%"}
      alignItems={"center"}
    >
      <CardBody display="flex" alignItems="center" justifyContent="center">
        {" "}
        <Popover>
          <PopoverTrigger>
            <Button px={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <span>Create</span>
                <GiPotionBall size={25} />
              </Stack>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Box px={2} py={7} textAlign={"center"}>
              <Heading size={"md"}>Alignment</Heading>
              <NpcSlider></NpcSlider>
              <Heading size={"md"}>Appearance</Heading>
              <NpcSlider></NpcSlider>
              <Heading size={"md"}>Affluence</Heading>
              <NpcSlider></NpcSlider>
            </Box>

            <Button px={3} onClick={onCreate}>
              Confirm
            </Button>
          </PopoverContent>
        </Popover>
      </CardBody>
    </Card>
  );
}

export default NpcCreate;
