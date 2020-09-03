import {
  Box,
  CSSReset,
  Flex,
  Heading,
  Text,
  theme,
  ThemeProvider,
} from "@chakra-ui/core";
import styled from "@emotion/styled";
import React from "react";
import BingoGrid from "./Components/BingoGrid";
import Configurator from "./Components/Configurator";
import { BingoProvider, useBingoContext } from "./Hooks/useBingo";

const customTheme = {
  ...theme,
};

const Sidebar = styled(Box)``;

const Content: React.FC = () => {
  const { numbers, bride, groom } = useBingoContext();
  return (
    <Flex width={["100%", "100%", 0.5]} wrap="wrap">
      <BingoGrid numbers={numbers} bride={bride} groom={groom} />
    </Flex>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <link
        href="https://fonts.googleapis.com/css2?family=Bilbo+Swash+Caps&display=swap"
        rel="stylesheet"
      />
      <BingoProvider>
        <Flex
          maxW={1400}
          width={["100%", "100%", 0.8]}
          m="0 auto"
          mt="3rem"
          p={[5, 5, 0]}
          justify="space-between"
          alignItems="justifyContent"
          wrap={["wrap-reverse", "wrap-reverse", "wrap"]}
          h="auto"
        >
          <Content />
          <Sidebar
            borderRadius="4px"
            boxShadow="rgba(0, 0, 0, 0.35) 0px 2px 10px"
            bg="#f9f9f9"
            pl={4}
            width={["100%", "100%", 0.4]}
            p={5}
          >
            <Heading textAlign="center" w="100%" size="lg" mb={5}>
              Hochzeit-Bingo Generator
            </Heading>
            <Text>
              Wähle hier deine Einstellungen aus und erstelle dir ein
              Spielplatt. Auf der linken Seite siehst du eine Vorschau.
            </Text>
            <Configurator />
          </Sidebar>
        </Flex>
      </BingoProvider>
    </ThemeProvider>
  );
};

export default App;
