"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  palette: {
    "app-dark": {
      main: "#090c4a",
      contrastText: "#fff",
    },
  },
});

export default theme;
