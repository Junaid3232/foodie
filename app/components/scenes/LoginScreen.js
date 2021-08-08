import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  AsyncStorage,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { InlineTextInput } from "react-native-stateless-form";
import ThemeStyle from "../../styles/Theme";
import Icon from "../../common/icons";
import { saveData } from "../../utilts/utility";
import { _storeData, _retrieveData } from "../../utilts/AsyncFuncs";
import Loading from "./Loading";

import { signInWithEmail, getCurrentUserId } from "../../utilts/auth";
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      emailError: "",
      passwordError: "",
    };
  }
  ClearUserData = async () => {
    AsyncStorage.setItem("firstTime", "Yes");
    AsyncStorage.setItem("firstTimeDialog", "Yes");
  };
  Login = async () => {
    this.setState({ loading: true });
    let validation = true;
    const emailsyntax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email == "") {
      validation = false;
      this.setState({ emailError: "Email is required", loading: false });
    } else if (!emailsyntax.test(this.state.email.trim())) {
      validation = false;
      this.setState({
        emailError: "Please enter a valid email",
        loading: false,
      });
    }
    if (this.state.password == "") {
      validation = false;
      this.setState({ passwordError: "Password is required", loading: false });
    }
    if (validation) {
      this.setState({ loading: true });
      try {
        await signInWithEmail(this.state.email.trim(), this.state.password)
          .then(async (check) => {
            if (check == true) {
              let uid = await getCurrentUserId();
              console.log(uid);

              AsyncStorage.setItem("userId", uid)
                .then(() => {
                  this.setState({ loading: false });
                  this.props.navigation.navigate("AppTabNavigator");
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              this.setState({ loading: false });
            }
          })
          .catch((error) => {
            this.setState({ loading: false });
            console.log(error);
            alert("Email is badly fomated");
          });
      } catch (error) {
        this.setState({ loading: false });
        alert("error");
      }
    }
  };
  render() {
    const { email, password } = this.state;
    const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    const passwordValid = password && password.length >= 8 ? true : false;
    return (
      <View style={ThemeStyle.pageContainer}>
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "transparent",
          }}
        >
          <Image
            source={require("../../src/bgTeeChow.jpg")}
            style={{
              resizeMode: "cover",
              width: null,
              height: Dimensions.get("window").height,
              opacity: 1,
              backgroundColor: "#5b3717",
            }}
          />
        </View>
        <KeyboardAwareScrollView>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 40,
            }}
          >
            <Image
              source={require("../../src/teechowicon.png")}
              style={{ width: 140, height: 120, resizeMode: "contain" }}
            />
            <Image
              source={require("../../src/teechowTextWhite.png")}
              style={{ width: 140, height: 100, resizeMode: "contain" }}
            />
          </View>

          <View style={styles.container}>
            <InlineTextInput
              label="Email"
              placeholder="Email Address"
              placeholderstyle={{ color: "transparent" }}
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.passwordTextInput.focus();
              }}
              blurOnSubmit={false}
              autoCapitalize="none"
              keyboardType="email-address"
              style={{
                borderColor: "#fff",
                margin: 20,
                paddingHorizontal: 15,
                borderRadius: 20,
                borderWidth: 1,
                backgroundColor: "#fff",
                fontFamily: "Lato-Regular",
              }}
              labelStyle={{ color: "#000" }}
              inputStyle={{ color: "#000" }}
              messageStyle={{ color: "red" }}
              icon={<Icon name={"mail-outline"} size={18} color={"#000"} />}
              validIcon={<Icon name="check" size={18} color="#ffee00" />}
              invalidIcon={<Icon name="clear" size={18} color="red" />}
              value={email}
              onChangeText={(text) => {
                this.setState({ email: text, emailError: "" });
              }}
              {...this.props}
            />
            {this.state.emailError ? (
              <Text style={styles.text1}>{this.state.emailError}</Text>
            ) : null}
            <InlineTextInput
              label="Password"
              ref={(input) => {
                this.passwordTextInput = input;
              }}
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              style={{
                borderColor: "#FFF",
                margin: 20,
                borderRadius: 20,
                borderWidth: 1,
                paddingHorizontal: 15,
                fontFamily: "Lato-Regular",
              }}
              labelStyle={{ color: "#000" }}
              inputStyle={{ color: "#000" }}
              messageStyle={{ color: "red" }}
              icon={
                <Icon name={"add-circle-outline"} size={18} color={"#000"} />
              }
              validIcon={<Icon name="check" size={18} color="#ffee00" />}
              invalidIcon={<Icon name="clear" size={18} color="red" />}
              value={password}
              onChangeText={(text) => {
                this.setState({ password: text, passwordError: "" });
              }}
              {...this.props}
            />
            {this.state.passwordError ? (
              <Text style={styles.text1}>{this.state.passwordError}</Text>
            ) : null}
          </View>

          <View style={{ paddingVertical: 15 }}>
            <TouchableOpacity
              style={[
                ThemeStyle.buttonColor,
                {
                  marginLeft: 20,
                  marginRight: 20,
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
              onPress={() => {
                this.Login();
                this.ClearUserData();
              }}
            >
              {this.state.loading ? (
                <Loading />
              ) : (
                <Text style={styles.text}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ paddingVertical: 15 }}
            onPress={() => {
              this.props.navigation.navigate("RegisterScreen");
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 18,
                fontFamily: "Lato-Regular",
              }}
            >
              Don't have an account?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingVertical: 15 }}
            onPress={() => {
              this.props.navigation.navigate("ForgotPassword");
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 18,
                fontFamily: "Lato-Regular",
              }}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  social: {
    margin: 5,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "grey",
    shadowOffset: { width: -0.3, height: 0 },
    shadowOpacity: 0.3,
    backgroundColor: "transparent",
    elevation: 3,
  },
  text: {
    fontSize: 15,
    fontFamily: "Lato-Bold",
    color: "#fff",
    fontWeight: "bold",
  },
  text1: {
    fontSize: 15,
    fontFamily: "Lato-Bold",
    color: "red",
    fontWeight: "bold",
    marginLeft: 25,
  },
});
