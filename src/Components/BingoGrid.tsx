import {
  AspectRatioBox,
  AspectRatioBoxProps,
  Box,
  Flex,
  FlexProps,
  Heading,
} from "@chakra-ui/core";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";

const BingoBox = styled<React.FC<AspectRatioBoxProps>, { isFirst: boolean }>(
  AspectRatioBox
)`
  border-right: 4px solid #4c4c4c;
  border-bottom: 4px solid #4c4c4c;
  display: flex;
  justify-content: center;
  align-content: center;
  ${(props) =>
    props.isFirst &&
    css`
      border-left: 4px solid #4c4c4c;
    `}
`;

const BingoRow = styled<React.FC<FlexProps>, { isFirst: boolean }>(Flex)`
  ${(props) =>
    props.isFirst &&
    css`
      border-top: 4px solid #4c4c4c;
    `}
`;

const TitleText = styled(Heading)`
  font-family: "Bilbo Swash Caps", cursive;
  text-align: center;
  padding-left: 75px;
  right: 75px;
  font-size: 3rem !important;
`;

const Heart = styled(Box)`
  position: absolute;
  width: 50px;
  height: 50px;
  top: 30px;
  left: 30px;
  transform: rotate(-15deg);
`;

const BingoGrid: React.FC<{
  numbers: number[][];
  bride: string;
  groom: string;
}> = ({ numbers, bride, groom }) => {
  return (
    <Flex direction="column" w="100%" mr={3} pos="relative">
      <TitleText my={5} as="h3">
        {bride} & {groom}
        <Heart visibility={["hidden", "hidden", "visible"]}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 231.94 215.042">
            <path
              d="M93.648 73.064c-62.344-99.917-96.114 28.01 12.383 84.94 93.011-79.76 26.028-196.272-12.383-84.94z"
              strokeWidth="10"
              stroke="#000"
              fill="none"
            />
          </svg>
        </Heart>
      </TitleText>
      <Box>
        {numbers.map((row, idx) => (
          <BingoRow
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            isFirst={idx === 0}
          >
            {row.map((number, idy) => (
              <BingoBox
                // eslint-disable-next-line react/no-array-index-key
                key={idy}
                ratio={1}
                width={`${100 / row.length}%`}
                isFirst={idy === 0}
              >
                <Flex fontSize="2rem" align="center" justify="center">
                  {number === 999 ? "X" : number}
                </Flex>
              </BingoBox>
            ))}
          </BingoRow>
        ))}
      </Box>
    </Flex>
  );
};

export default BingoGrid;
