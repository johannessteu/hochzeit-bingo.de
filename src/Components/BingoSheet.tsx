import { Flex } from "@chakra-ui/core";
import React from "react";
import { Document, Text, View, StyleSheet, Page } from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";

const styles = StyleSheet.create({
  headline: {
    fontSize: "50",
    width: "100%",
    textAlign: "center",
    fontFamily: "Oswald",
  },
  tile: {
    top: -20,
    margin: 0,
  },
});

const NumberText = styled.Text`
  font-size: 30px;
  position: absolute;
  border: 2px solid black;
  margin: 0;
  display: flex;
  text-align: center;
  padding-top: 35%;
`;

const Tile: React.FC<{
  cnt: number;
  row: number;
  left: number;
  idx: number;
  number: number;
}> = ({ idx, left, cnt, row, number }) => {
  const size = cnt > 4 ? 97 : 100;

  return (
    <View style={[styles.tile, { top: `${size * row}px` }]}>
      <NumberText
        style={{
          left: `${left * size - idx * 2}px`,
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {number === 999 ? "X" : number}
      </NumberText>
    </View>
  );
};

const BingoSheet: React.FC<{
  bride: string;
  groom: string;
  numbers: number[][][];
}> = ({ numbers, bride, groom }) => {
  return (
    <Document>
      {numbers.map((n) => {
        return (
          <Page size="A4">
            <View style={{ top: 50 }}>
              <Text style={styles.headline}>
                {bride} & {groom}
              </Text>
            </View>
            {n.map((row, i) => {
              return (
                <View style={{ top: "70px", left: "10%", width: "80%" }}>
                  {row.map((cell, idx) => (
                    <Tile
                      cnt={row.length}
                      row={i}
                      idx={idx}
                      left={idx}
                      number={cell}
                    />
                  ))}
                </View>
              );
            })}
          </Page>
        );
      })}
    </Document>
  );
};

export default BingoSheet;
