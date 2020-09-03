import {
  Button,
  Input,
  NumberInput,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/core";
import { Font } from "@react-pdf/renderer";
import React, { ChangeEvent, useEffect } from "react";
import { useBingoContext } from "../Hooks/useBingo";

Font.register({
  family: "Bilbo",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const Configurator: React.FC = ({ children }) => {
  const {
    shuffleNumbers,
    downloadPdf,
    numberAmount,
    bride,
    setBride,
    setGroom,
    sheets,
    setSheets,
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
      <Text mt={4} fontWeight="bold">
        Wie viele Spielblätter benötigst du?
      </Text>
      <NumberInput
        defaultValue={sheets}
        onChange={(n) => setSheets(Number(n))}
      />
      <Button mt={4} onClick={() => downloadPdf()}>
        Download
      </Button>
    </div>
  );
};

export default Configurator;
