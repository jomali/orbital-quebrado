import React from "react";
// @ts-expect-error 3d-dice does not support TS
import DiceBox from "@3d-dice/dice-box";
import LoadingButton from "@mui/lab/LoadingButton";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Skills, { Skill } from "../Skills";
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
        scale: isLargeMode ? 6 : 8,
        spinForce: 10,
        startingHeight: 10,
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
    if (open && !diceResult) {
      result = "Continuar";
    } else if (diceResult && diceResult >= difficulty) {
      result = "Éxito";
    } else if (diceResult && diceResult < difficulty) {
      result = "Fracaso";
    }
    return result;
  }, [diceResult, difficulty, open]);

  const [ini, setIni] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setIni(true);
    }
  }, [open]);

  return (
    <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.modal - 1 }}>
      <Box
        ref={diceBoxRef}
        id="skill-check"
        sx={{
          display: "flex",
          flexGrow: 1,
          height: "100% !important",
          "& > canvas:first-child": {
            display: "none",
          },
          "& > canvas:last-child": {
            height: "100% !important",
            width: "100% !important",
          },
        }}
      />
      <Dialog
        fullWidth
        hideBackdrop
        maxWidth="xs"
        open={ini || Boolean(diceResult) || diceResult === 0}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: (theme) => theme.spacing(2),
          }}
        >
          {attribute ? (
            <Typography>
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
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Typography>Dificultad: {difficulty}</Typography>
            {diceResult && <Typography>Resultado: {diceResult}</Typography>}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LoadingButton
              disabled={isLoading}
              disableElevation
              loading={isLoading}
              onClick={() => {
                if (!diceResult) {
                  rollDice();
                  setIni(false);
                } else {
                  handleClose();
                }
              }}
              size="large"
              sx={{ width: "200px" }}
              variant="contained"
            >
              {dialogButtonLabel}
            </LoadingButton>
          </Box>
        </DialogContent>
      </Dialog>
    </Backdrop>
  );
};

export default DiceResult;
