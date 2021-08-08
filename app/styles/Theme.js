import { Platform } from 'react-native';
import {COLORS} from "../constants/COLORS";
export default ThemeStyle =
{
  pageContainer: {
    flex:1,
    backgroundColor:"#f9f2f3"
  },
  buttonColor:{
    height:45,
    borderRadius:20,
    borderWidth:1,
    // borderColor:'#F53B50',
    // backgroundColor:'#F53B50',
      borderColor: COLORS.MAIN_GREEN,
      backgroundColor: COLORS.MAIN_GREEN,
  },
    tabBarBackgroundColor : COLORS.MAIN_GREEN,
    foodName              : 'rgb(209,69,93)',
    IconColor             : '#F53B50',
    textColor             : '#F53B50',
    profileButtonColor    : '#51cec3',
    tabBarActiveTextColor : '#7be58c'
}
