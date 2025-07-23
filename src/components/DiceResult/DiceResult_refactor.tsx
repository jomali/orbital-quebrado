import React from "react";
// @ts-expect-error 3d-dice does not support TS
import DiceBox from "@3d-dice/dice-box";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "../Button";
import Skills, { Skill } from "../Skills";
import SkillNumber from "./SkillNumber";
import "./diceResult.css";

export interface IDiceResult {
  attribute?: Skill;
  difficulty?: number;
  // eslint-disable-next-line no-unused-vars
  onAccept: (accept: boolean) => void;
  open: boolean;
}

const DiceResult: React.FC<IDiceResult> = (props) => {
  const { attribute, difficulty = 0, onAccept, open } = props;
  const theme = useTheme();

  const isLargeMode = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [diceBox, setDiceBox] = React.useState<any>();
  const [diceResult, setDiceResult] = React.useState<number | null>();

  const diceBoxRef = React.useRef<any>();

  const rollDice = async () => {
    if (diceBox) {
      setIsLoading(true);
      const [result] = await diceBox.show().roll([
        {
          sides: "d100",
          themeColor: attribute
            ? theme.attribute[attribute].main
            : theme.palette.primary.main,
        },
      ]);
      setIsLoading(false);
      setDiceResult(result.value);
    }
  };

  const handleClose = () => {
    diceBox.clear();
    setDiceResult(null);
    onAccept((diceResult ?? 0) >= difficulty);
  };

  React.useLayoutEffect(() => {
    if (diceBoxRef.current && !diceBox) {
      // Note the dice-box assets in the public folder.
      // Those files are all necessary for the web workers to function properly
      const dice = new DiceBox({
        container: "#skill-check", // target DOM element to inject the canvas for rendering
        assetPath: "/assets/",
        enableShadows: true,
        id: "dice-canvas", // canvas element id
        lightIntensity: 0.9,
        scale: 12, // isLargeMode ? 6 : 8,
        spinForce: 6,
        startingHeight: 8,
        theme: "smooth",
        themeColor: theme.palette.primary.main,
        throwForce: 8,
      });
      dice.init();
      setDiceBox(dice);
    }
  }, [diceBoxRef.current, isLargeMode, theme.palette.primary.main]);

  const dialogButtonLabel = React.useMemo(() => {
    let result = "";
    if ((diceResult || diceResult === 0) && diceResult >= difficulty) {
      result = "Éxito";
    } else if ((diceResult || diceResult === 0) && diceResult < difficulty) {
      result = "Fracaso";
    } else {
      result = "Continuar";
    }
    return result;
  }, [diceResult, difficulty, open]);

  return (
    <Dialog fullWidth keepMounted maxWidth="xs" open={open}>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: (theme) => theme.spacing(4),
          padding: (theme) => theme.spacing(4, 0),
        }}
      >
        {attribute ? (
          <Typography align="center" variant="h5">
            Prueba de&nbsp;
            <span
              style={{
                color: theme.attribute[attribute].main,
              }}
            >
              {Skills[attribute]}
            </span>
          </Typography>
        ) : null}

        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            gap: (theme) => theme.spacing(4),
            justifyContent: "center",
          }}
        >
          <SkillNumber label={"Dificultad"} value={difficulty} />
          {(diceResult || diceResult === 0) && (
            <SkillNumber label={"Resultado"} value={diceResult} />
          )}
        </Box>

        <Box
          ref={diceBoxRef}
          id="skill-check"
          sx={{
            display: "flex",
            flexGrow: 1,

            backgroundImage: `repeating-linear-gradient(-45deg, rgba(255,255,255, 0.25), rgba(255,255,255, 0.25) 1px, transparent 1px, transparent 6px)`,
            backgroundSize: "4px 4px",

            // height: "100% !important",
            // "& > canvas:first-child": {
            //   display: "none",
            // },
            // "& > canvas:last-child": {
            //   height: "100% !important",
            //   width: "100% !important",
            // },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            disabled={isLoading}
            onClick={() => {
              if (diceResult || diceResult === 0) {
                handleClose();
              } else {
                rollDice();
              }
            }}
            size="large"
            sx={{
              flexGrow: 0,
              width: "200px",
              ...(attribute !== undefined && {
                backgroundColor: (theme: any) =>
                  theme.attribute[attribute].main,
                color: (theme: any) => theme.attribute[attribute].contrastText,
              }),
            }}
            variant="contained"
          >
            {dialogButtonLabel}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DiceResult;
