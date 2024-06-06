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

const theme = createTheme({
  palette: {
    primary: {
      main: "#DA0037",
    },
    background: {
      default: "#171717",
      paper: "#171717",
    },
    mode: "dark",
  },
});

export default createTheme(theme, {
  attribute: {
    intellect: theme.palette.augmentColor({
      color: {
        main: "#3385FF",
      },
      name: "intellect",
    }),
    motorics: theme.palette.augmentColor({
      color: {
        main: "#33FF44",
      },
      name: "motorics",
    }),
    physique: theme.palette.augmentColor({
      color: {
        main: "#FF5233",
      },
      name: "physique",
    }),
    psyche: theme.palette.augmentColor({
      color: {
        main: "#CF33FF",
      },
      name: "psyche",
    }),
  },
});
