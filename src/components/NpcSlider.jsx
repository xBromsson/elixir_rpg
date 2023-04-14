import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

function NpcSlider({ name, onSliderChange }) {
  const [sliderValue, setSliderValue] = useState(3);

  const handleChange = (value) => {
    setSliderValue(value);
    onSliderChange(name, value);
  };

  return (
    <Box mx={5}>
      <Slider
        id={name}
        name={name}
        defaultValue={3}
        min={1}
        max={5}
        colorScheme="teal"
        onChange={(v) => {
          handleChange(v);
          console.log(v);
        }}
        step={1}
      >
        <SliderMark mt={2} value={1} fontSize="sm">
          1
        </SliderMark>
        <SliderMark mt={2} value={2} fontSize="sm">
          2
        </SliderMark>
        <SliderMark mt={2} value={3} fontSize="sm">
          3
        </SliderMark>
        <SliderMark mt={2} value={4} fontSize="sm">
          4
        </SliderMark>
        <SliderMark name="5" mt={2} ml={-1} value={5} fontSize="sm">
          5
        </SliderMark>
        <SliderTrack pb={3}>
          <SliderFilledTrack pb={3} />
        </SliderTrack>
        <Tooltip hasArrow bg="teal.500" color="white" placement="top">
          <SliderThumb />
        </Tooltip>
      </Slider>
    </Box>
  );
}

export default NpcSlider;
