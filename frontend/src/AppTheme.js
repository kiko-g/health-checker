import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { blue, blueGrey } from "@mui/material/colors";
export const fontFamily = ['"Rubik"', "Roboto", "Arial", "sans-serif"];

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      first: "#7A9CC6", //cerulean frost blue
      second: "#9FBBCC", //pale cerulean blue
      third: "#B3D2B2", //turquoise green
      fourth: "#BDE4A7", //granny smith apple green
      fifth: "#FFFD98", //canary yellow
    },
    typography: {
      fontFamily: fontFamily.join(","),
    },
  })
);

// Add custom palette variants
theme.palette = {
  ...theme.palette,
  tertiary: {
    main: "#C1D2D6",
  },
  dark: {
    main: "#333333",
  },
};

export default theme;
