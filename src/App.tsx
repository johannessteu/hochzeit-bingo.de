import React from "react";
import {
  ThemeProvider,
  CSSReset,
  theme,
  Flex,
  Heading,
  Text,
  Box,
  Button,
} from "@chakra-ui/core";
import { BingoProvider } from "./Hooks/useBingo";
import Configurator from "./Components/Configurator";
import BingoGrid from "./Components/BingoGrid";

const customTheme = {
  ...theme,
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <BingoProvider>
        <Flex
          maxW={1200}
          width={["100%", "100%", 0.7]}
          m="0 auto"
          alignItems="justifyContent"
          wrap={["wrap-reverse", "wrap-reverse", "wrap"]}
          h="auto"
        >
          <Flex width={["100%", "100%", 0.6]}>
            <BingoGrid />
          </Flex>
          <Box width={["100%", "100%", 0.4]} bg="red.100" p={3}>
            <Heading w="100%" size="md">
              Willkommen beim Hochzeit-Bingo-Generator!
            </Heading>
            <Configurator />
          </Box>
        </Flex>
      </BingoProvider>
    </ThemeProvider>
  );
};

export default App;
