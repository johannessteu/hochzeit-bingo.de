import { Font, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import React, { createContext, useCallback, useContext, useState } from "react";
import { BilboFont } from "../Components/BilboFont";
import BingoSheet from "../Components/BingoSheet";

interface BingoContextInterface {
  numbers: number[][];
  bride: string;
  setBride: (b: string) => void;
  setGroom: (b: string) => void;
  groom: string;
  sheets: number;
  setSheets: (n: number) => void;
  numberAmount: number;
  shuffleNumbers: (a: number) => void;
  downloadPdf: () => void;
  generateNumbers: (n: number) => number[][];
}

Font.register({
  family: "Oswald",
  src: BilboFont,
});

const BingoContext = createContext<BingoContextInterface | undefined>(
  undefined
);

const randomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
};

const BingoProvider: React.FC = ({ children }) => {
  const [numbers, setNumbers] = useState<number[][]>([[]]);
  const [numberAmount, setNumberAmount] = useState(25);
  const [sheets, setSheets] = useState(5);
  const [bride, setBride] = useState("Jutta");
  const [groom, setGroom] = useState("Olaf");

  const generateNumbers = (amount: number) => {
    const n: number[] = [];

    while (n.length < amount) {
      const nextInt = randomInt(amount);

      if (!n.includes(nextInt)) {
        n.push(nextInt);
      }
    }

    const chunkSize = Math.sqrt(amount);
    const chunkedNumbers: number[][] = [];

    for (let i = 0; i < chunkSize; i += 1) {
      chunkedNumbers.push(n.slice(i * chunkSize, i * chunkSize + chunkSize));
    }

    return chunkedNumbers;
  };

  const shuffleNumbers = useCallback((amount: number) => {
    const n = generateNumbers(amount);
    setNumbers(n);
    setNumberAmount(amount);
  }, []);

  const downloadPdf = async () => {
    console.log(generateNumbers(numberAmount));

    const gameNumbers = new Array(sheets)
      .fill("")
      .map(() => generateNumbers(numberAmount));

    const blob = await pdf(
      <BingoSheet numbers={gameNumbers} bride={bride} groom={groom} />
    ).toBlob();

    saveAs(blob, "hochzeit-bingo.pdf");
  };

  return (
    <BingoContext.Provider
      value={{
        numbers,
        numberAmount,
        bride,
        sheets,
        setSheets,
        groom,
        setBride,
        setGroom,
        shuffleNumbers,
        generateNumbers,
        downloadPdf,
      }}
    >
      {children}
    </BingoContext.Provider>
  );
};

const useBingoContext = (): BingoContextInterface => {
  const context = useContext(BingoContext);
  if (context === undefined) {
    throw new Error("useBingoContext must be used within a BingoProvider");
  }

  return context;
};

export { useBingoContext, BingoProvider };
