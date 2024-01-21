import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Div100vh from "react-div-100vh";
import { StoryProvider } from "./components/engine";
import storylets, { initial } from "./components/storylets";
import theme from "./components/theme";

const App = () => {
  return (
    <Div100vh>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StoryProvider initialStorylet={initial} storylets={storylets} />
      </ThemeProvider>
    </Div100vh>
  );
};

export default App;
