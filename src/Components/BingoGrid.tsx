import React from "react";
import { Box } from "@chakra-ui/core";
import { useBingoContext } from "../Hooks/useBingo";

const BingoGrid: React.FC = () => {
  const { numbers } = useBingoContext();

  return (
    <>
      {numbers.map((row) => (
        <Box border="1 px solid">
          {row.map((number) => (
            <Box p={4} m={2}>
              {number}
            </Box>
          ))}
        </Box>
      ))}
    </>
  );
};

export default BingoGrid;
