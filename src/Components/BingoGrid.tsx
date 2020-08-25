import React from "react";
import { Box, Flex } from "@chakra-ui/core";
import { useBingoContext } from "../Hooks/useBingo";

const BingoGrid: React.FC = () => {
  const { numbers, numberAmount } = useBingoContext();

  return (
    <Flex direction="column" w="100%" mr={3}>
      {numbers.map((row, idx) => (
        <Flex
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          style={{
            borderLeft: "1px solid black",
            borderRight: "1px solid black",
          }}
        >
          {row.map((number, idy) => (
            <Flex
              // eslint-disable-next-line react/no-array-index-key
              key={idy}
              width={`${100 / row.length}%`}
              height="50px"
              style={{ border: "1px solid black" }}
              justify="center"
              align="center"
            >
              {number}
            </Flex>
          ))}
        </Flex>
      ))}
    </Flex>
  );
};

export default BingoGrid;
