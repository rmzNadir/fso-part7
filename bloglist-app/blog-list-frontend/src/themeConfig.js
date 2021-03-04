import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#cc2949',
    },
    secondary: {
      main: green['A200'],
    },
  },
});

export default theme;
