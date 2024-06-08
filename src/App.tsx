import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Div100vh from "react-div-100vh";
import { Dice, StoryProvider } from "./components/engine";
import theme from "./components/theme";
import "./app.css";

// Initializes the Dice Box outside of the component
Dice.init();

const App = () => {
  return (
    <Div100vh>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StoryProvider story="orbital-quebrado-pugil.json" />
      </ThemeProvider>
    </Div100vh>
  );
};

export default App;
