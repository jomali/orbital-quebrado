import React from "react";
import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";

const ElevationScroll = (props: {
  children: React.ReactElement<
    { elevation: number },
    string | React.JSXElementConstructor<unknown>
  >;
}) => {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 2 : 0,
  });
};

const Gap = styled("span")(() => ({
  flexGrow: 1,
}));

const Header = () => {
  return (
    <ElevationScroll>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          color: (theme) => theme.palette.text.primary,
        }}>
        <Toolbar>
          Header
          <Gap />
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;
