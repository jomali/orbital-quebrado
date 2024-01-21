import React from "react";
import { Storylet } from "../../engine";

const StoryletA = () => {
  return (
    <Storylet>
      <p>Storylet B</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Dictum at tempor
        commodo ullamcorper.
      </p>
    </Storylet>
  );
};

export default {
  key: "storylet-a",
  storylet: <StoryletA />,
};
