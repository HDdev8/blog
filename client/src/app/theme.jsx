import {createTheme, responsiveFontSizes} from "@mui/material/styles";

let theme = createTheme({
  palette: {
    contrastThreshold: 4.5,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
