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
      main: "#4caf50",
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
        main: "#6ba3af",
      },
      name: "intellect",
    }),
    motorics: baseTheme.palette.augmentColor({
      color: {
        main: "#E4E748",
      },
      name: "motorics",
    }),
    physique: baseTheme.palette.augmentColor({
      color: {
        main: "#ff5439",
      },
      name: "physique",
    }),
    psyche: baseTheme.palette.augmentColor({
      color: {
        main: "#b354ca",
      },
      name: "psyche",
    }),
  },
});
