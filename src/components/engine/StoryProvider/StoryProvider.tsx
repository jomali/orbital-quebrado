import React from "react";
import Box from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { Story } from "inkjs";
import AppBar from "../AppBar";
import Dice from "../Dice";
import DiceResult from "../DiceResult";
import Option, { IOption } from "../Option";
import SideBar from "../SideBar";

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

export interface IStoryProvider {
  story: string;
}

export const StoryContext = React.createContext({});

const StoryProvider: React.FC<IStoryProvider> = (props) => {
  const { story: storyFile } = props;
  const theme = useTheme();

  // FIXME - define correct type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollableRef: any = React.useRef();

  const [contents, setContents] = React.useState<(string | null)[]>([]);
  const [currentView, setView] = React.useState(0);
  const [diceResult, setDiceResult] = React.useState<number | null>();
  const [story, setStory] = React.useState<InstanceType<typeof Story>>();

  const getNextContent = () => {
    const result: { data: (string | null)[]; newScreen: boolean } = {
      data: [],
      newScreen: false,
    };
    // while (story?.canContinue) {
    const nextParagraph = story.Continue();
    if (nextParagraph === "@cleanScreen\n") {
      result.newScreen = true;
      // continue;
    } else {
      result.data.push(nextParagraph);
    }
    // }
    return result;
  };

  const handleContinue = () => {
    if (story?.canContinue) {
      setContents((currentContents) => {
        const newContent = getNextContent();
        const previouseContents = newContent.newScreen
          ? []
          : [...currentContents];
        return [...previouseContents, ...newContent.data];
      });
    }
  };

  const printOptions = () => {
    return (
      <Stack direction="column" spacing={1} sx={{ marginTop: 8 }}>
        {story?.canContinue ? (
          <Option onClick={() => handleContinue()} variant="default">
            ...
          </Option>
        ) : (
          <>
            {// FIXME - define correct type
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            story?.currentChoices.map((element: any, index: number) => {
              const attribute = element.tags[0]?.match(/(.*)\((\d*)\)/);
              console.log(`🔔 element`, element);

              // const moneyCost = parseInt(element.tags?.[0] ?? "0");
              return (
                <Option
                  key={`option-${index}`}
                  attribute={attribute?.[1] as IOption["attribute"]}
                  difficulty={Number(attribute?.[2])}
                  // disabled={moneyCost > story?.variablesState["money"]}
                  onClick={async () => {
                    story.ChooseChoiceIndex(index);
                    if (element.tags[1]) {
                      const [result] = await Dice.show().roll([
                        {
                          sides: "d100",
                          themeColor: theme.palette.primary.main,
                        },
                      ]);
                      console.log(`🔔 result`, result);

                      setDiceResult(result.value);

                      // const result = Math.floor(Math.random() * 2);
                      story.ChoosePathString(
                        result.value < 50 ? element.tags[2] : element.tags[1]
                      );
                    }
                    handleContinue();
                  }}
                  variant={element.variant as "election" | undefined}>
                  {element.text}
                </Option>
              );
            })}
          </>
        )}
      </Stack>
    );
  };

  React.useEffect(() => {
    const fetchStory = async () => {
      const storyData = await fetch(storyFile);
      const result = await storyData.text();
      const inkStory = new Story(result);
      setContents([inkStory.Continue()]);
      setStory(inkStory);
    };

    fetchStory();
  }, [storyFile]);

  React.useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [contents]);

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
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                flexDirection: "column",
              }}>
              {contents.map((element, index) => (
                <motion.div
                  key={`content-${index}`}
                  ref={scrollableRef}
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 1 }}>
                  <Typography sx={{ marginBottom: 3 }}>{element}</Typography>
                </motion.div>
              ))}
            </Box>
            {printOptions()}
          </Box>
          <SideBar onChange={setView} value={currentView} />
        </Container>
      </Main>

      <DiceResult
        difficulty={50}
        onClose={() => setDiceResult(null)}
        value={diceResult}
      />
    </StoryContext.Provider>
  );
};

export default StoryProvider;
