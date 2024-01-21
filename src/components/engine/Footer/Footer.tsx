import * as React from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

const Footer = () => {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper
      elevation={3}
      sx={{ display: "flex", position: "fixed", bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        onChange={handleChange}
        sx={{ flexGrow: 1 }}
        value={value}>
        <BottomNavigationAction
          icon={<PlayArrowRoundedIcon />}
          label="Historia"
          value="story"
        />
        <BottomNavigationAction
          icon={<PersonRoundedIcon />}
          label="Personaje"
          value="character"
        />
        <BottomNavigationAction
          icon={<PlaceRoundedIcon />}
          label="Mapa"
          value="map"
        />
        <BottomNavigationAction
          icon={<SettingsRoundedIcon />}
          label="Menú"
          value="menu"
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;
