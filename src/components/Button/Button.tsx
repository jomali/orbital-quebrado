import React from "react";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

const Button: React.FC<IButton> = (props) => {
  const {
    children,
    disabled,
    sx = {},
    variant = "outlined",
    ...otherProps
  } = props;

  return (
    <ButtonBase
      disabled={disabled}
      focusRipple
      sx={(theme) => ({
        backgroundColor: "transparent",
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: `${theme.shape.borderRadius}px`,
        color: theme.palette.primary.main,
        display: "flex",
        flexGrow: 1,
        padding: theme.spacing(1.2, 3.2),
        ...(variant === "contained" && {
          backgroundColor: theme.palette.primary.main,
          border: 0,
          color: theme.palette.primary.contrastText,
        }),
        ...(disabled && {
          color: theme.palette.action.disabled,
        }),
        ...(disabled &&
          variant === "contained" && {
            backgroundColor: theme.palette.action.disabledBackground,
            color: theme.palette.action.disabled,
          }),
        ...sx,
      })}
      {...otherProps}
    >
      <Typography
        sx={{
          display: "flex",
          flexGrow: 1,
          gap: (theme) => theme.spacing(1.5),
          justifyContent: "center",
        }}
      >
        {children}
      </Typography>
    </ButtonBase>
  );
};

export interface IButton {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: VoidFunction;
  size: string;
  sx?: object;
  variant?: "contained" | "outlined";
}

export default Button;
