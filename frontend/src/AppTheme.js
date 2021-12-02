import { createTheme, responsiveFontSizes } from '@mui/material/styles';
export const fontFamily = ["\"Rubik\"", "Roboto", "Arial", "sans-serif"];

const theme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: "#DC4F47",
    },
    secondary: {
      main: "#4F1315",
    },
  },
  status: {
    danger: "orange",
  },
  typography: {
    fontFamily: fontFamily.join(","),
    h1: {
      fontFamily: fontFamily.join(","),
    },
    h2: {
      fontFamily: fontFamily.join(","),
    },
    h3: {
      fontFamily: fontFamily.join(","),
      fontWeight: 700,
    },
    h4: {
      fontFamily: fontFamily.join(","),
    },
    h5: {
      fontFamily: fontFamily.join(","),
    },
    h6: {
      fontFamily: fontFamily.join(","),
    },
  },
}));

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