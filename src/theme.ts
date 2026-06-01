import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#176b58", dark: "#105044", light: "#d9eee7" },
    background: { default: "#eef5f1", paper: "#ffffff" },
    text: { primary: "#17322e", secondary: "#60746f" },
    divider: "#d8e5df",
    warning: { main: "#a67c00", light: "#fff7dc" },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1.07 },
    h2: { fontSize: "clamp(1.35rem, 3vw, 1.75rem)", fontWeight: 700, letterSpacing: "-0.025em" },
    h6: { fontWeight: 700 },
    button: { fontWeight: 750, textTransform: "none" },
  },
  components: {
    MuiButton: { styleOverrides: { root: { minHeight: 42 } } },
    MuiTextField: { defaultProps: { size: "small" } },
    MuiFormControl: { defaultProps: { size: "small" } },
  },
});
