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

function ItemSlider({ name, onSliderChange }) {
  const [sliderValue, setSliderValue] = useState(5);

  const mapNumberToText = (value) => {
    const alignmentTexts = {
      1: "chaotic evil",
      2: "neutral evil",
      3: "lawful evil",
      4: "chaotic neutral",
      5: "neutral",
      6: "lawful neutral",
      7: "chaotic good",
      8: "neutral good",
      9: "lawful good",
    };
    return alignmentTexts[value];
  };

  const handleChange = (value) => {
    setSliderValue(value);
    const textValue = mapNumberToText(value);
    onSliderChange(name, textValue);
  };

  return (
    <Box mx={5}>
      <Slider
        id={name}
        name={name}
        defaultValue={5}
        min={1}
        max={9}
        colorScheme="teal"
        onChange={(v) => {
          handleChange(v);
          const textValue = mapNumberToText(v);
          console.log(textValue);
        }}
        step={1}
      >
        <SliderMark mt={2} value={1} fontSize="sm"></SliderMark>
        <SliderMark mt={2} value={2} fontSize="sm"></SliderMark>
        <SliderMark mt={2} value={3} fontSize="sm"></SliderMark>
        <SliderMark mt={2} value={4} fontSize="sm"></SliderMark>
        <SliderMark mt={2} value={5} fontSize="sm"></SliderMark>
        <SliderMark mt={2} value={6} fontSize="sm"></SliderMark>
        <SliderMark mt={2} value={7} fontSize="sm"></SliderMark>
        <SliderMark mt={2} value={8} fontSize="sm"></SliderMark>
        <SliderMark mt={2} value={9} fontSize="sm"></SliderMark>
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

export default ItemSlider;
