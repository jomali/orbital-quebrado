import React from "react";
import styled from "@emotion/styled";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { Tooltip } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import { alpha, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import useDebounce from "../useDebounce";

const ElevationScroll: React.FC<{ children: React.ReactElement }> = (props) => {
  const { children } = props;
  const theme = useTheme();

  const isTriggered = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    sx: {
      ...(isTriggered && {
        backgroundColor: alpha(theme.palette.background.default, 0.2),
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid " + theme.palette.divider,
      }),
    },
  });
};

const Gap = styled("span")(() => ({
  flexGrow: 1,
}));

const AppBar: React.FC<IAppBar> = (props) => {
  const { onMenuClick, title, TitleProps = {} } = props;

  const theme = useTheme();
  const debouncedTitle = useDebounce(title, TitleProps.timeout || 0);

  return (
    <ElevationScroll>
      <MuiAppBar elevation={0} position="fixed">
        <Toolbar>
          <Fade in={title === debouncedTitle}>
            <Typography
              sx={{
                color: theme.palette.text.primary,
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              {debouncedTitle}
            </Typography>
          </Fade>
          <Gap />
          {onMenuClick ? (
            <Tooltip title="Reiniciar">
              <IconButton
                aria-label="menu"
                edge="end"
                onClick={onMenuClick}
                size="medium"
              >
                <ReplayRoundedIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          ) : null}
        </Toolbar>
      </MuiAppBar>
    </ElevationScroll>
  );
};

export interface IAppBar {
  onMenuClick?: () => void;
  title: string;
  TitleProps?: {
    timeout?: number;
  };
}

export default AppBar;
