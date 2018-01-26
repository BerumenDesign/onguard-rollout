import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator'

const NewTheme = () => {
  let overwrites = {
    "palette": {
        "primary1Color": Colors.blue500,
        "primary2Color": Colors.indigo700,
        "accent1Color": fade(Colors.blue600, 0.77)
    },
    "appBar": {
        "color": fade(Colors.black, 0.03),
        "textColor": fade(Colors.lightBlack, 0.54)
    }
};
  return getMuiTheme(baseTheme, overwrites);
}
