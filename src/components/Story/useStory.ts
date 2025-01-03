import React from "react";
import { Story } from "inkjs";

const CLEAN_SCREEN_TAG = "@cleanScreen\n";

type Choice = {
  attribute?: "default" | "intellect" | "motorics" | "physique" | "psyche";
  callback: VoidFunction;
  difficulty?: number;
  disabled?: boolean;
  key: string;
  label: string;
  variant?: "default" | "highlight";
};

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

// eslint-disable-next-line no-unused-vars
type Continue = (options?: { choice: number; step?: "all" | "one" }) => void;

type StoryContent = {
  divider?: boolean;
  key: string;
  new: boolean;
  value?: string | null;
};

export default (storyFile: string) => {
  const [story, setStory] = React.useState<InstanceType<typeof Story>>();
  const [contents, setContents] = React.useState<StoryContent[]>([]);
  const [skillCheck, setSkillCheck] = React.useState<{
    attribute: "intellect" | "motorics" | "physique" | "psyche";
    difficulty: IntRange<0, 100>;
    failureKnot: string;
    id: number;
    successKnot: string;
  }>();

  React.useEffect(() => {
    const fetchStory = async () => {
      const storyData = await fetch(storyFile);
      const result = await storyData.text();
      const inkStory = new Story(result);
      const contents = getNextStorylet(inkStory);
      setContents([...contents.data]);
      setStory(inkStory);
    };

    fetchStory();
  }, [storyFile]);

  const handleContinue: Continue = (options) => {
    if (story?.canContinue) {
      const newContent =
        options?.step !== "one"
          ? getNextStorylet(story)
          : getNextParagraph(story);
      const previousContents = newContent.newScreen
        ? []
        : [
            ...contents.map((element) => ({
              ...element,
              new: false,
            })),
            {
              divider: true,
              key: Date.now().toString(),
              new: false,
            },
          ];

      setContents(() => [...previousContents, ...newContent.data]);
    }
  };

  const choices = React.useMemo(() => {
    let result: Choice[] = [];
    if (story?.canContinue) {
      result = [
        {
          callback: () => handleContinue(),
          key: `choice-0-${Date.now().toString()}`,
          label: "…",
        },
      ];
    } else {
      result =
        story?.currentChoices.map((element, index) => {
          const attribute = element.tags?.[0]?.match(/(.*)\((\d*)\)/);
          return {
            attribute: attribute?.[1] as Choice["attribute"],
            callback: () => {
              if (attribute?.[1]) {
                setSkillCheck(() => ({
                  attribute: attribute[1] as
                    | "intellect"
                    | "motorics"
                    | "physique"
                    | "psyche",
                  difficulty: Number(attribute?.[2]) as IntRange<0, 100>,
                  failureKnot: element.tags?.[2] as string,
                  id: index,
                  successKnot: element.tags?.[1] as string,
                }));
              } else {
                story.ChooseChoiceIndex(index);
                handleContinue();
              }
            },
            difficulty: attribute?.[2] ? Number(attribute[2]) : undefined,
            disabled: false,
            key: `choice-${index}-${Date.now().toString()}`,
            label: element.text,
            variant:
              element.tags?.[0] === "highlight" ? "highlight" : "default",
          };
        }) ?? [];
    }
    return result;
  }, [story?.currentChoices]);

  const getNextParagraph: (
    // eslint-disable-next-line no-unused-vars
    storyObject: InstanceType<typeof Story>,
    // eslint-disable-next-line no-unused-vars
    newScreen?: boolean
  ) => {
    data: StoryContent[];
    newScreen: boolean;
  } = (storyObject, newScreen = false) => {
    const result: {
      data: StoryContent[];
      newScreen: boolean;
    } = {
      data: [],
      newScreen: newScreen,
    };
    if (storyObject) {
      const nextParagraph = storyObject.Continue();
      if (nextParagraph === CLEAN_SCREEN_TAG) {
        return getNextParagraph(storyObject, true);
      } else {
        result.data.push({
          key: Date.now().toString(),
          new: true,
          value: nextParagraph,
        });
      }
    }
    return result;
  };

  const getNextStorylet: (
    // eslint-disable-next-line no-unused-vars
    storyObject: InstanceType<typeof Story>,
    // eslint-disable-next-line no-unused-vars
    newScreen?: boolean
  ) => {
    data: StoryContent[];
    newScreen: boolean;
  } = (storyObject, newScreen = false) => {
    const result: { data: StoryContent[]; newScreen: boolean } = {
      data: [],
      newScreen: newScreen,
    };
    while (storyObject?.canContinue) {
      const nextParagraph = storyObject.Continue();
      if (nextParagraph === CLEAN_SCREEN_TAG) {
        result.newScreen = true;
        continue;
      } else {
        result.data.push({
          key: Date.now().toString(),
          new: true,
          value: nextParagraph,
        });
      }
    }
    return result;
  };

  const handleRestart = React.useCallback(() => {
    if (story) {
      story.ResetState();
      const contents = getNextStorylet(story);
      setContents([...contents.data]);
    }
  }, [story]);

  return {
    canContinue: story?.canContinue ?? false,
    choices,
    contents,
    continue: handleContinue,
    endSkillCheck: (isSuccess: boolean) => {
      const temp = skillCheck;
      setSkillCheck(undefined);
      story?.ChooseChoiceIndex(temp?.id as number);
      story?.ChoosePathString(
        isSuccess
          ? (temp?.successKnot as string)
          : (temp?.failureKnot as string)
      );
      handleContinue();
    },
    globalTags: story?.globalTags ?? [],
    restart: handleRestart,
    skillCheck,
    state: {
      money: story?.variablesState["money"] ?? 0,
    },
  };
};
