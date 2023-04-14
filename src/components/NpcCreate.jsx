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
  Text,
  HStack,
} from "@chakra-ui/react";

import { GiPotionBall } from "react-icons/gi";
import NpcSlider from "./NpcSlider";

const onCreate = () => {};

function NpcCreate({ onCreate, onSliderChange }) {
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
              <HStack justifyContent={"space-between"} mt={3} mx={2}>
                <Text>Evil</Text>
                <Text>Good</Text>
              </HStack>
              <NpcSlider
                onSliderChange={onSliderChange}
                name="alignment"
              ></NpcSlider>
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
