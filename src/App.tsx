import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Div100vh from "react-div-100vh";
import Story from "./components/Story";
import theme from "./theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => {
  return (
    <Div100vh>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story storyFile="orbital-rojo.json" />
      </ThemeProvider>
    </Div100vh>
  );
};

export default App;
