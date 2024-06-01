import React from "react";
import Box from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";
import { styled, useTheme } from "@mui/material/styles";
import AppBar from "../AppBar";
import SideBar from "../SideBar";

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
  flexDirection: "column",
  height: "100%",
}));

const Container = styled(MuiContainer)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  padding: "0 !important",
  [theme.breakpoints.up("md")]: {
    borderLeft: "1px solid " + theme.palette.divider,
    borderRight: "1px solid " + theme.palette.divider,
  },
}));

export const StoryContext = React.createContext({});

const StoryProvider = (props: StoryProviderProps) => {
  console.log(`🔔 props`, props);

  const [currentView, setView] = React.useState(0);
  const theme = useTheme();

  const story = {};

  return (
    <StoryContext.Provider value={story}>
      <Main>
        <AppBar />

        <Container maxWidth="md">
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              padding: 2,
              [theme.breakpoints.up("sm")]: {
                padding: 3,
              },
            }}>
            <p>Lorem ipsum dolor.</p>
          </Box>
          <SideBar onChange={setView} value={currentView} />
        </Container>
      </Main>
    </StoryContext.Provider>
  );
};

export default StoryProvider;
