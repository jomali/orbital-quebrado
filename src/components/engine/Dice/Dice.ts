// @ts-expect-error 3d-dice does not support TS
import DiceBox from "@3d-dice/dice-box";
import theme from "../../theme";

/*  --------------- DICE BOX -------------- */
// Note the dice-box assets in the public folder.
// Those files are all necessary for the web workers to function properly
// create new DiceBox class
const Dice = new DiceBox(
  "#dice-box", // target DOM element to inject the canvas for rendering
  {
    assetPath: "/assets/dice-box/",
    enableShadows: true,
    id: "dice-canvas", // canvas element id
    lightIntensity: 0.9,
    scale: 7.5,
    spinForce: 5,
    startingHeight: 8,
    theme: "smooth",
    themeColor: theme.palette.primary.main,
    throwForce: 6,
  }
);

export default Dice;
