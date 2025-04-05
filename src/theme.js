import { cyan, deepOrange, orange, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// Create a theme instace

const theme = createTheme({
  colorSchemes: {
    //light: {
    //  palette: {
    //    primary: teal,
    //    secondary: deepOrange,
    //    background: "#D7D5D5",
    //  },
    //},
    //dark: {
    //  palette: {
    //    primary: cyan,
    //    secondary: orange,
    //  },
    //},
    //palette: {
    //  secondary: teal,
    //},
    //palette: {
    //  secondary: {
    //    main: "#FF5733", // Thay đổi màu thứ cấp
    //  },
    //},
  },
  // ... other properties
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          display: "flex",
          alignItems: "center",
          gap: 20,
          width: "12rem",
          justifyContent: "flex-start",
          marginBottom: 50,
          marginLeft: 12,
          cursor: "pointer",
          color: "#fff",
          overflow: "hidden",
          //minWidth: "3vw",
        },
      },
    },
  },
});

export default theme;
