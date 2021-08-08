import {StyleSheet,Dimensions} from 'react-native';
var t = require('tcomb-form-native');
const {width, height} = Dimensions.get('window');
var Form = t.form.Form;

export default Formstyle2 = {

  form: {...Form.stylesheet,
    formGroup:{...Form.stylesheet.formGroup,
      normal: {
        ...Form.stylesheet.formGroup.normal,
        borderColor:'#AD2266',
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
        color:'#AD2266',
      },
      error: {
        ...Form.stylesheet.controlLabel.error,
        marginBottom: 0,
        zIndex:250,
      }
    },
    textbox:{...Form.stylesheet.textbox,
      normal: {

      },
      error: {

      }
    },
},
  buttonNormal: {
    height:50,
    width:width-100,
    backgroundColor: '#AD2266',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingLeft:10,
    paddingRight:10,
    justifyContent: 'center'
  },
  buttonTransparent: {
    height: 55,
    backgroundColor: '#AD2266',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft:10,
    paddingRight:10,
    justifyContent: 'center'
  },
  buttonTextNormal: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center'
  },
  buttonTextTransparent: {
    fontSize: 25,
    fontWeight:'bold',
    color: 'black',
    alignSelf: 'center'
  },

  chechBoxStyle: {
    height:parseInt(width/27.42),
    width:parseInt(width/27.42),
    borderRadius:2,
  }
}
