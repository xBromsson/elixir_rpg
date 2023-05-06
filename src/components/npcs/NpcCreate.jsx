import {
  Button,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Heading,
  Text,
  HStack,
  Divider,
  PopoverArrow,
  PopoverCloseButton,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { FaRegPlusSquare } from "react-icons/fa";
import NpcSlider from "./NpcSlider";

function NpcCreate({ onCreate, onSliderChange, onRoleChange }) {
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
            <Box p={2}>
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
            <Box>
              <Heading as={"u"} textAlign={"left"} pt={5} size={"sm"}>
                Role:
              </Heading>
              <RadioGroup defaultValue="unspecified" onChange={onRoleChange}>
                <Stack p={2}>
                  <Radio value="unspecified">Unspecified</Radio>
                  <Radio value="merchant">Merchant</Radio>
                  <Radio value="antagonist">Antagonist</Radio>
                  <Radio value="quest giver">Quest Giver</Radio>
                </Stack>
              </RadioGroup>
            </Box>
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
