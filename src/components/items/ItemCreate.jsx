import {
  Button,
  Box,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Heading,
  RadioGroup,
  Radio,
  PopoverArrow,
  PopoverCloseButton,
  Divider,
} from "@chakra-ui/react";
import { FaRegPlusSquare } from "react-icons/fa";

const ItemCreate = ({ onCreate, onTypeChange }) => {
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
            <Box>
              <Heading as={"u"} textAlign={"left"} pt={5} size={"sm"}>
                Item Type:
              </Heading>
              <RadioGroup defaultValue="random" onChange={onTypeChange}>
                <Stack p={2}>
                  <Radio value="random">Random</Radio>
                  <Radio value="armor">Armor</Radio>
                  <Radio value="weapon">Weapon</Radio>
                  <Radio value="tool">Tool</Radio>
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
};

export default ItemCreate;
