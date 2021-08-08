import React, { useState, useEffect, Component } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  DeviceInfo,
  SafeAreaView,
  AsyncStorage,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatelessForm, InlineTextInput } from "react-native-stateless-form";
import ThemeStyle from "../../styles/Theme";
import Icon from "../../common/icons";
import { saveData } from "../../utilts/utility";
import { _storeData, _retrieveData } from "../../utilts/AsyncFuncs";
import Loading from "./Loader";
export default class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = async () => {
    AsyncStorage.getItem("userId").then((res) => {
      if (res != undefined) {
        this.props.navigation.navigate("AppTabNavigator");
      } else {
        this.props.navigation.navigate("LoginScreen");
      }
    });
  };
  render() {
    return <Loading />;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
