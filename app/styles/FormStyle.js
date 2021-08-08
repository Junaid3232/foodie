import { Platform,Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');
//T-comb form
var t = require('tcomb-form-native');
var Form = t.form.Form;

export default FormStyle = {

  text: {...Form.stylesheet,
      textbox:{...Form.stylesheet.textbox,
        normal: {
            ...Form.stylesheet.textbox.normal,
            borderWidth:1,
            borderRadius:5,
            borderColor:'#fff',
            backgroundColor:'white',
            marginBottom:0,
            height: parseInt(height/12.42),
            paddingVertical: (Platform.OS === 'ios') ? 7 : 0,
            paddingHorizontal: parseInt(width/16.45),
            fontSize:16,
        },
        error: {
          ...Form.stylesheet.textbox.error,
          borderWidth:1,
          borderRadius:5,
          borderColor:'red',
          backgroundColor:'white',
          marginBottom:0,
          height: parseInt(height/12.42),
          paddingVertical: (Platform.OS === 'ios') ? 7 : 0,
          paddingHorizontal: parseInt(width/16.45),
          fontSize:16,
        }
      },
      controlLabel:{...Form.stylesheet.controlLabel,
          normal: {
              ...Form.stylesheet.controlLabel.normal,
              marginBottom: 0,
              color:'#fefffe',
              zIndex:250,
          },
          error: {
            ...Form.stylesheet.controlLabel.error,
            marginBottom: 0,
            zIndex:250,
          }
      },
    },

    buttonNormal: {
      height:50,
      width:width-100,
      backgroundColor: 'transparent',
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
      backgroundColor: 'transparent',
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
