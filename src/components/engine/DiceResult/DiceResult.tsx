import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import Dice from "../Dice";
import "./diceResult.css";

export interface IDiceResult {
  difficulty?: number;
  onClose: VoidFunction;
  value?: number;
}

const DiceResult: React.FC<IDiceResult> = (props) => {
  const { difficulty, onClose, value } = props;
  const theme = useTheme();

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
          themeColor: theme.palette.primary.main,
        },
      ]);
      console.log(`🔔 result`, result);
      setIsLoading(false);
      setDiceResult(result.value);
    }
  };

  const handleClose = () => {
    setDiceResult(null);
    onClose();
  };

  React.useLayoutEffect(() => {
    if (diceBoxRef.current) {
      // Note the dice-box assets in the public folder.
      // Those files are all necessary for the web workers to function properly
      const dice = new Dice(
        "#skill-check", // target DOM element to inject the canvas for rendering
        {
          assetPath: "/assets/dice-box/",
          enableShadows: true,
          id: "dice-canvas", // canvas element id
          lightIntensity: 0.9,
          scale: 13, // 7.5
          spinForce: 5,
          startingHeight: 8,
          theme: "smooth",
          themeColor: theme.palette.primary.main,
          throwForce: 6,
        }
      );
      dice.init();
      setDiceBox(dice);
    }
  }, [diceBoxRef.current, theme.palette.primary.main]);

  const dialogButtonLabel = React.useMemo(() => {
    let result = "";
    if (value && !diceResult) {
      result = "Lanzar dados";
    } else if (diceResult) {
      result = "Continuar";
    }
    return result;
  }, [diceResult, value]);

  return (
    <Dialog fullWidth keepMounted maxWidth="xs" open={Boolean(value)}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: 0,
          padding: "20px",
        }}>
        Dificultad: {difficulty}
      </DialogTitle>
      <DialogContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <Divider />
        <div ref={diceBoxRef} id="skill-check" />
        <Divider />
      </DialogContent>

      <DialogActions
        sx={{ justifyContent: "center", paddingBottom: "20px", paddingTop: 0 }}>
        <LoadingButton
          disableElevation
          loading={isLoading}
          // onClick={rollDice}
          onClick={() => (!diceResult ? rollDice() : handleClose())}
          size="large"
          variant="contained">
          {dialogButtonLabel}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DiceResult;
