import { orange } from '@mui/material/colors';
import { createTheme, ThemeOptions } from '@mui/material/styles';

const globalMuiThemeConfig: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 600,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      mobile: 0,
      tablet: 640,
    },
  },
  palette: {
    primary: {
      main: orange[500],
    },
  },
};

// DO NOT CHANGE LINES AFTER THIS MARK
export const globalMuiTheme = createTheme(globalMuiThemeConfig);
