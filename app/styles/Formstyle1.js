import {StyleSheet} from 'react-native';
import ThemeStyle from './Theme';
var t = require('tcomb-form-native');
var Form = t.form.Form;

export default Formstyle1 = {

  form: {...Form.stylesheet,
    formGroup:{...Form.stylesheet.formGroup,
      normal: {
        ...Form.stylesheet.formGroup.normal,
        borderColor:ThemeStyle.buttonColor,
        borderBottomWidth:1,
        backgroundColor:'transparent',
        marginLeft:20,
        marginRight:20,
      },
      error: {
        ...Form.stylesheet.formGroup.error,
        borderColor:'red',
        borderBottomWidth:1,
        backgroundColor:'transparent',
        marginLeft:20,
        marginRight:20,
      }
    },
    controlLabel:{...Form.stylesheet.controlLabel,
      normal: {
        ...Form.stylesheet.controlLabel.normal,
        marginBottom: 0,
        color:ThemeStyle.foodName,
      },
    },
    textbox:{...Form.stylesheet.textbox,
      normal: {
          fontSize:16,
          fontFamily:"Lato-Regular"

      },
      error: {
          fontSize:16,
          fontFamily:"Lato-Regular"
      }
    },
  }
}
