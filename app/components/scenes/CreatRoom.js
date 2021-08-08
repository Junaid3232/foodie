import React, { useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import firestore from "@react-native-firebase/firestore";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { user } from "firebase-functions/lib/providers/auth";

const CreateRoom = (props) => {
  const [Room, setRoom] = useState("");

  const handleButtonPress = () => {
    if (Room.length > 0) {
      // create new thread using firebase & firestore
      firestore()
        .collection("MESSAGE_THREADS")
        .add({
          name: Room,
          latestMessage: {
            text: `${Room}`,
            createdAt: new Date().getTime(),
          },
        })
        .then((docRef) => {
          docRef.collection("MESSAGES").add({
            text: `${Room} created. Welcome!`,
            createdAt: new Date().getTime(),

            system: true,
          });

          props.navigation.navigate("Room");
        });
    }
  };
  return (
    <View style={{ justifyContent: "center", flex: 1 }}>
      <TextInput
        style={styles.textbox}
        onChangeText={(text) => setRoom(text)}
        placeholder="Room Name Here.."
      />
      <TouchableOpacity
        style={{ alignSelf: "center" }}
        onPress={handleButtonPress}
      >
        <Text style={{ fontSize: 20, margin: 10 }}> Create Room</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  textbox: {
    height: 40,
    width: 120,
    borderRadius: 5,
    alignSelf: "center",
    borderColor: "green",
    borderWidth: 1,
  },
});
export default CreateRoom;

//bellow commented code is code of coupens screen which is replaced by chat

// import React, { Component } from "react";
// import {
//   Alert,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
//   TextInput,
//   Keyboard,
//   LayoutAnimation,
// } from "react-native";
// import Modal from "react-native-modal";
// import ThemeStyle from "../../styles/Theme";
// import Icon from "../../common/icons";
// import { COLORS } from "../../constants/COLORS";

// const screenHeight = Dimensions.get("window").height;
// const screenWidth = Dimensions.get("window").width;

// export default class SpecialCoupans extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       visible: true,
//       height: 0,
//     };
//     this.didFocusListener = this.props.navigation.addListener(
//       "didFocus",
//       (obj) => {
//         this.setState({ visible: true });
//       }
//     );
//   }

//   componentWillMount() {
//     this.keyboardWillShowListener = Keyboard.addListener(
//       "keyboardWillShow",
//       this.keyboardWillShow.bind(this)
//     );
//     console.log("height", this.state.height);
//   }

//   keyboardWillShow(deviceEvent) {
//     this.setState({
//       height: deviceEvent.endCoordinates.height,
//     });
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//   }
//   useKeyboardFocus() {
//     this.setState({ flag: true });
//   }
//   getBack() {
//     this.setState({ visible: false });
//     this.props.navigation.navigate("Restaurant");
//   }
//   render() {
//     return (
//       <View
//         style={[
//           ThemeStyle.pageContainer,
//           // {...ifIphoneX({marginTop: 30})}
//         ]}
//       >
//         <Modal
//           transparent
//           overlayBackgroundColor={"rgba(0,0,0,.9)"}
//           style={{
//             flex: 0,
//             margin: 0,
//             borderTopLeftRadius: 25,
//             borderTopRightRadius: 25,
//             height: this.state.flag
//               ? screenHeight > 667
//                 ? "40%"
//                 : "80%"
//               : screenHeight > 667
//               ? "40%"
//               : "50%",
//             top: this.state.flag
//               ? screenHeight > 667
//                 ? Dimensions.get("window").height * 0.6 - this.state.height
//                 : Dimensions.get("window").height * 0.15
//               : screenHeight > 667
//               ? Dimensions.get("window").height * 0.6
//               : Dimensions.get("window").height * 0.5,
//           }}
//           visible={this.state.visible}
//           swipeDirection={["up"]}
//           width={"100%"}
//           animationIn={"slideInUp"}
//           animationOut={"slideOutDown"}
//           onRequestClose={() => {
//             console.log("gg");
//           }}
//           //   onBackdropPress={() => {
//           //     props.toggleModal();
//           //   }}
//         >
//           <View style={styles.container}>
//             <TouchableOpacity
//               style={styles.icon}
//               onPress={() => {
//                 this.getBack();
//               }}
//             >
//               <Icon
//                 name="arrow-down-drop-circle"
//                 family="MaterialCommunityIcons"
//                 size={50}
//                 color={ThemeStyle.tabBarBackgroundColor}
//               />
//             </TouchableOpacity>

//             <Text style={styles.text2}>Add Discount Coupns</Text>
//             <View style={styles.bottom}>
//               <TextInput
//                 style={styles.textInput}
//                 onFocus={() => {
//                   this.useKeyboardFocus();
//                 }}
//                 onBlur={() => {
//                   this.setState({ flag: false });
//                 }}
//               />
//               {/* <Text styel={styles.text}></Text> */}
//               <TouchableOpacity style={styles.button}>
//                 <Text style={styles.text1}>Add</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* </ModalContent> */}
//         </Modal>
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     height: "100%",
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//     width: "100%",
//     elevation: 5,
//     elevation: 5,
//     shadowOffset: { width: 1, height: 1 },
//     shadowColor: "grey",
//     shadowOpacity: 0.8,
//   },
//   header: {
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "90%",
//     flexDirection: "row",
//     alignSelf: "center",
//     // marginTop:40
//   },
//   text: {
//     fontSize: 16,
//     fontFamily: "Lato-Bold",
//   },
//   icon: {
//     position: "absolute",
//     top: -15,
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   textInput: {
//     height: 50,
//     borderWidth: 0.3,
//     width: "90%",
//     alignSelf: "center",
//     borderColor: "#696969",
//     borderRadius: 5,
//     padding: 10,
//   },
//   button: {
//     height: 55,
//     width: "90%",
//     alignSelf: "center",
//     backgroundColor: ThemeStyle.tabBarBackgroundColor,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   text1: {
//     fontSize: 18,
//     fontFamily: "Lato-Bold",
//     color: "#fff",
//   },
//   text2: {
//     fontSize: 19,
//     // fontFamily: "Lato-Regular",
//     marginLeft: 20,
//     marginTop: 50,
//   },
//   bottom: {
//     width: "100%",
//     height: "80%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
