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
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { FaRegPlusSquare } from "react-icons/fa";
import NpcSlider from "./NpcSlider";

const onCreate = () => {};

function NpcCreate({ onCreate, onSliderChange }) {
  return (
    <Box>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Button>
            <FaRegPlusSquare />
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
          <PopoverArrow />
          <PopoverCloseButton />
        </PopoverContent>
      </Popover>
    </Box>
  );
}

export default NpcCreate;
