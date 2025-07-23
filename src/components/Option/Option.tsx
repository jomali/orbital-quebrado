import React from "react";
import { styled } from "@mui/material/styles";
import Button from "../Button";

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
    <Button
      disabled={disabled}
      variant={variant === "highlight" ? "contained" : "outlined"}
      {...otherProps}
    >
      {buttonContents}
    </Button>
  );
};

export default Option;
