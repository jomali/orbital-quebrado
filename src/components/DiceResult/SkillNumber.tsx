import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const SkillNumber: React.FC<ISkillNumber> = (props) => {
  const { label, value } = props;

  return (
    <Box>
      <Typography variant="caption">{label}</Typography>
      <Typography variant="h3">{value && value !== 0 ? "—" : value}</Typography>
    </Box>
  );
};

export interface ISkillNumber {
  label: string;
  value?: number;
}

export default SkillNumber;
