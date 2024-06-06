import React from "react";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export interface IOption {
  attribute?: "default" | "intellect" | "motorics" | "physique" | "psyche";
  children: string;
  difficulty?: number;
  disabled?: boolean;
  onClick: VoidFunction;
  variant?: "default" | "election";
}

const Button = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "disabled",
})(({ disabled, theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: `${theme.shape.borderRadius}px`,
  color: theme.palette.primary.contrastText,
  display: "flex",
  flexGrow: 1,
  padding: theme.spacing(1.2, 3.2),
  // "&:hover": {
  //   backgroundColor: theme.palette.primary.dark,
  // },
  ...(disabled && {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  }),
}));

const Option: React.FC<IOption> = (props) => {
  const {
    attribute = "default",
    children,
    difficulty,
    disabled,
    variant,
    ...otherProps
  } = props;

  const ButtonAppendix = React.useMemo(() => {
    switch (attribute) {
      case "intellect":
      case "motorics":
      case "physique":
      case "psyche":
        return (
          <Stack direction="row" spacing={0.4}>
            <Typography>{difficulty ?? 0}</Typography>
            <CurrencyLiraIcon />
          </Stack>
        );
      default:
        return null;
    }
  }, [difficulty, attribute]);

  return (
    <Button
      disabled={disabled}
      focusRipple
      sx={{
        ...(variant === "default" && {
          backgroundColor: "transparent",
          border: "1px solid",
          color: (theme) => theme.palette.primary.main,
        }),
        ...(attribute === "intellect" && {
          backgroundColor: (theme) => theme.attribute.intellect.main,
          color: (theme) => theme.attribute.intellect.contrastText,
        }),
        ...(attribute === "motorics" && {
          backgroundColor: (theme) => theme.attribute.motorics.main,
          color: (theme) => theme.attribute.motorics.contrastText,
        }),
        ...(attribute === "physique" && {
          backgroundColor: (theme) => theme.attribute.physique.main,
          color: (theme) => theme.attribute.physique.contrastText,
        }),
        ...(attribute === "psyche" && {
          backgroundColor: (theme) => theme.attribute.psyche.main,
          color: (theme) => theme.attribute.psyche.contrastText,
        }),
      }}
      {...otherProps}>
      <Typography>{children}</Typography>
      {ButtonAppendix}
    </Button>
  );
};

export default Option;
