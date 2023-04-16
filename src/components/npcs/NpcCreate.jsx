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
  Divider,
  Skeleton,
} from "@chakra-ui/react";

import { GiPotionBall } from "react-icons/gi";
import NpcSlider from "./NpcSlider";

const onCreate = () => {};

function NpcCreate({ onCreate, onSliderChange, isLoading }) {
  return (
    <Box>
      {isLoading ? (
        <Skeleton width={"200px"} height={"190px"} />
      ) : (
        <Card
          border={"solid"}
          borderWidth={2}
          borderStyle={"dashed"}
          height={"190px"}
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
              <PopoverContent px={5} py={5}>
                <Box mx={5} my={5} textAlign={"center"}>
                  <Heading py={1} size={"lg"}>
                    NPC Creator
                  </Heading>
                  <Divider />
                  <Heading as={"u"} textAlign={"left"} pt={5} size={"sm"}>
                    Alignment:
                  </Heading>
                  <HStack justifyContent={"space-between"} mt={3} mx={0}>
                    <Text fontSize={13}>Chaotic Evil</Text>
                    <Text fontSize={13}>Lawful Good</Text>
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
      )}
    </Box>
  );
}

export default NpcCreate;
