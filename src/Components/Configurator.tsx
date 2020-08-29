import {
  Button,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/core";
import React, { ChangeEvent, useEffect } from "react";
import { useBingoContext } from "../Hooks/useBingo";

const Configurator: React.FC = ({ children }) => {
  const {
    shuffleNumbers,
    numberAmount,
    bride,
    setBride,
    setGroom,
    groom,
  } = useBingoContext();

  useEffect(() => shuffleNumbers(numberAmount), [shuffleNumbers, numberAmount]);

  return (
    <div>
      {children}

      <Text mt={4} fontWeight="bold">
        Wie heißt die Braut?
      </Text>
      <Input
        placeholder={bride}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setBride(event.target.value)
        }
      />

      <Text mt={4} fontWeight="bold">
        Wie heißt der Bräutigam?
      </Text>
      <Input
        placeholder={groom}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setGroom(event.target.value)
        }
      />

      <Text fontWeight="bold" mt={4}>
        Wie viele Fragen soll es geben?
      </Text>
      <Text>{numberAmount}</Text>

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
        Zahlen neu generieren
      </Button>
    </div>
  );
};

export default Configurator;
