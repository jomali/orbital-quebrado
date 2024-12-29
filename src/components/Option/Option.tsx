import React from "react";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export interface IOption {
  attribute?: "default" | "intellect" | "motorics" | "physique" | "psyche";
  children: string;
  difficulty?: number;
  disabled?: boolean;
  onClick: VoidFunction;
  variant?: "default" | "highlight";
}

const AttributeSpan = styled("span", {
  shouldForwardProp: (prop) => prop !== "attribute",
})(({ attribute, theme }: { attribute: string; theme?: any }) => ({
  color: theme.attribute[attribute].main,
}));

const Option: React.FC<IOption> = (props) => {
  const {
    attribute = "default",
    children,
    difficulty,
    disabled,
    variant = "default",
    ...otherProps
  } = props;

  const attributeName = React.useMemo(
    () => ({
      intellect: "Intelecto",
      motorics: "Motricidad",
      physique: "Físico",
      psyche: "Psique",
    }),
    []
  );

  const difficultyString = React.useMemo(() => {
    let result;
    if (difficulty) {
      if (difficulty < 20) {
        result = "Muy fácil";
      } else if (difficulty < 40) {
        result = "Fácil";
      } else if (difficulty < 60) {
        result = "Normal";
      } else if (difficulty < 80) {
        result = "Difícil";
      } else {
        result = "Muy difícil";
      }
    }
    return result;
  }, [difficulty]);

  const buttonContents = React.useMemo(
    () =>
      attribute !== "default" ? (
        <>
          {children}
          <AttributeSpan attribute={attribute}>
            [{attributeName[attribute]} - {difficultyString}]
          </AttributeSpan>
        </>
      ) : (
        children
      ),
    [attribute, attributeName, children, difficultyString]
  );

  return (
    <ButtonBase
      disabled={disabled}
      focusRipple
      sx={(theme) => ({
        backgroundColor: "transparent",
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: `${theme.shape.borderRadius}px`,
        color: (theme) => theme.palette.primary.main,
        display: "flex",
        flexGrow: 1,
        padding: theme.spacing(1.2, 3.2),
        ...(disabled && {
          backgroundColor: theme.palette.action.disabledBackground,
          color: theme.palette.action.disabled,
        }),
        ...(variant === "highlight" && {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }),
      })}
      {...otherProps}
    >
      <Typography
        sx={{
          display: "flex",
          flexGrow: 1,
          gap: (theme) => theme.spacing(1.2),
          justifyContent: "center",
        }}
      >
        {buttonContents}
      </Typography>
    </ButtonBase>
  );
};

export default Option;
