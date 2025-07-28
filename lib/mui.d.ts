import { TextFieldPropsColorOverrides } from "@mui/material/TextField";
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    "app-dark": Palette["primary"];
  }
  interface PaletteOptions {
    "app-dark"?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    "app-dark": true;
  }
}
