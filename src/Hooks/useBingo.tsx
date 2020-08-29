import React, { createContext, useCallback, useContext, useState } from "react";

interface BingoContextInterface {
  numbers: number[][];
  bride: string;
  setBride: (b: string) => void;
  setGroom: (b: string) => void;
  groom: string;
  numberAmount: number;
  shuffleNumbers: (cnt: number) => void;
}

const BingoContext = createContext<BingoContextInterface | undefined>(
  undefined
);

const randomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
};

const BingoProvider: React.FC = ({ children }) => {
  const [numbers, setNumbers] = useState<number[][]>([[]]);
  const [numberAmount, setNumberAmount] = useState(16);
  const [bride, setBride] = useState("Jutta");
  const [groom, setGroom] = useState("Olaf");

  const shuffleNumbers = useCallback((amount: number) => {
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

    setNumbers(chunkedNumbers);
    setNumberAmount(amount);
  }, []);

  return (
    <BingoContext.Provider
      value={{
        numbers,
        numberAmount,
        bride,
        groom,
        setBride,
        setGroom,
        shuffleNumbers,
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
