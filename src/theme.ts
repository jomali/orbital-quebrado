import { createTheme } from "@mui/material/styles";

interface IColor {
  main: string;
  light?: string;
  dark?: string;
  contrastText?: string;
}

declare module "@mui/material/styles" {
  interface Theme {
    attribute: {
      intellect: IColor;
      motorics: IColor;
      physique: IColor;
      psyche: IColor;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    attribute?: {
      intellect?: IColor;
      motorics?: IColor;
      physique?: IColor;
      psyche?: IColor;
    };
  }
}

const baseTheme = createTheme({
  palette: {
    primary: {
      main: "#D33E43", // "#4caf50",
    },
    background: {
      default: "#171717",
      paper: "#171717",
    },
    mode: "dark",
  },
});

export default createTheme(baseTheme, {
  attribute: {
    intellect: baseTheme.palette.augmentColor({
      color: {
        main: "#4B6858", // "#6ba3af",
      },
      name: "intellect",
    }),
    motorics: baseTheme.palette.augmentColor({
      color: {
        main: "#EEC170", // "#E4E748",
      },
      name: "motorics",
    }),
    physique: baseTheme.palette.augmentColor({
      color: {
        main: "#40BCD8", // "#ff5439",
      },
      name: "physique",
    }),
    psyche: baseTheme.palette.augmentColor({
      color: {
        main: "#B4A0E5", // "#b354ca",
      },
      name: "psyche",
    }),
  },
});
