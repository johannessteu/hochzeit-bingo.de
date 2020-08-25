import React, { useEffect } from "react";
import {
  Box,
  Button,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/core";
import { useBingoContext } from "../Hooks/useBingo";

const Configurator: React.FC = ({ children }) => {
  const { shuffleNumbers, numberAmount } = useBingoContext();

  useEffect(() => shuffleNumbers(numberAmount), [shuffleNumbers, numberAmount]);

  return (
    <div>
      {children}
      <Text mt={3}>
        Wie viele Fragen soll es geben? <strong>{numberAmount}</strong>
      </Text>

      <Slider
        defaultValue={numberAmount}
        onChange={(value) => {
          shuffleNumbers(
            Math.ceil(Math.sqrt(value)) * Math.ceil(Math.sqrt(value))
          );
        }}
        max={36}
        min={9}
      >
        <SliderTrack />
        <SliderFilledTrack />
        <SliderThumb />
      </Slider>
      <Button onClick={() => shuffleNumbers(numberAmount)}>
        Neu generieren
      </Button>
    </div>
  );
};

export default Configurator;
