/**
 * App Light Theme
 */
import { createMuiTheme } from '@material-ui/core/styles';
import AppConfig from 'Constants/AppConfig';

const theme = createMuiTheme({
   palette: {
      primary: {
         main: AppConfig.themeColors.primary
      },
      secondary: {
         main: AppConfig.themeColors.warning
      }
   },
   typography: {
      useNextVariants: true,
      //suppressDeprecationWarnings: true,
      // Use the system font instead of the default Roboto font.
      fontFamily: [
         "Roboto",
         "Helvetica",
         "Arial",
         'Heebo',
         'sans-serif',
      ].join(','),
      htmlFontSize: 16,
      h2: {
         fontSize: 21,
         fontWeight: 400,
      },
      body1: {
         fontSize: 14,
         fontWeight: 400,
      },
   },
});

export default theme;