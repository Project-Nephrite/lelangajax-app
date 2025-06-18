// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // or 'dark'
    primary: {
      main: "#2f6a43",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#4F6353",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#BA1A1A",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F6FBF3",
      paper: "#F6FBF3",
    },
    text: {
      primary: "#41644A",
      secondary: "#4F6353",
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontSize: "2.5rem", fontWeight: 700 },
    body1: { fontSize: "1rem" },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

export default theme;
