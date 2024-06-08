import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

export interface IDiceResult {
  difficulty?: number;
  onClose: VoidFunction;
  value?: number;
}

const DiceResult: React.FC<IDiceResult> = (props) => {
  const { difficulty, onClose, value } = props;

  return (
    <Dialog fullWidth maxWidth="xs" onClose={onClose} open={Boolean(value)}>
      {difficulty && value && (
        <DialogContent>
          <p>Dificultad: {difficulty}</p>
          <p>Resultado: {value}</p>
          <p>{value >= difficulty ? "Éxito" : "Fracaso"}</p>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DiceResult;
