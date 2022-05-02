import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#FE8065",
      contrastText: "#fff",
    }
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    button: {
      textTransform: "capitalize",
      fontWeight: 600,
      // textDecorationLine: "underline"
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 800,
    },
  },
});
