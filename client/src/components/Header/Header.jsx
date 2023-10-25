import React from 'react';
import { Typography, Box, useTheme } from "@mui/material";


const Header = ({title, subTitle, textAlignment}) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography variant='h2' color={theme.palette.secondary[200]} fontWeight="bold" sx={{ mb : "3px", mt:"10px"}} textAlign={textAlignment}>
        {title}
      </Typography>
      <Typography variant='h5' color={theme.palette.secondary[300]} textAlign={textAlignment} sx={{mb : "3px"}}>
        {subTitle}
      </Typography>
    </Box>
  )
}

export default Header;