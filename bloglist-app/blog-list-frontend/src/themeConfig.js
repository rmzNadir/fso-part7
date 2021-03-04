import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#cc2949',
    },
    secondary: {
      main: green['A200'],
    },
    text: {
      primary: '#ffff',
      secondary: '#d2d2d2',
    },
  },
});

export default theme;
