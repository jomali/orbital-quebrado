import React from "react";
import Fade from "@mui/material/Fade";
import { ThemeProvider, styled, useTheme } from "@mui/material/styles";
import Container from "../Container";
import Footer from "../Footer";
import Header from "../Header";

type ChildrenFunction = (context: unknown) => React.ReactNode;

type Storylet = {
  key: string;
  storylet: React.ReactNode;
};

type StoryProviderProps = {
  children?: React.ReactNode | ChildrenFunction;
  initialStorylet: Storylet;
  storylets: Storylet[];
};

const Main = styled("main")(() => ({
  display: "flex",
  height: "100%",
}));

export const StoryContext = React.createContext({});

const StoryProvider = (props: StoryProviderProps) => {
  const { children, initialStorylet, storylets } = props;

  const theme = useTheme();
  const story = {};

  return (
    <StoryContext.Provider value={story}>
      <ThemeProvider theme={theme}>
        <Main>
          <Header />

          {storylets.map((element) => (
            <Fade
              key={element.key}
              in={element.key === initialStorylet.key}
              mountOnEnter
              unmountOnExit>
              <Container maxWidth="sm">{element.storylet}</Container>
            </Fade>
          ))}

          <Footer />

          {typeof children === "function" ? children(story) : children}
        </Main>
      </ThemeProvider>
    </StoryContext.Provider>
  );
};

export default StoryProvider;
