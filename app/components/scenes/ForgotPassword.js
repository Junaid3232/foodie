import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { InlineTextInput } from "react-native-stateless-form";
import ThemeStyle from "../../styles/Theme";
import Icon from "../../common/icons";
import { _storeData, _retrieveData } from "../../utilts/AsyncFuncs";
import Loading from "./Loading";
import { auth } from "../../utilts/firebaseConfig";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
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
    if (validation) {
      this.setState({ loading: true });
      try {
        await auth.sendPasswordResetEmail(this.state.email).then((success) => {
          console.log("success", success);
          this.setState({ loading: false });
          alert("Email Sent");
          this.props.navigation.navigate("LoginScreen");
        });
      } catch (error) {
        this.setState({ loading: false });
        alert(error);
        console.log("error", error);
      }
    }
  };
  render() {
    const { email } = this.state;
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
              onPress={() => this.Login()}
            >
              {this.state.loading ? (
                <Loading />
              ) : (
                <Text style={styles.text}>Send</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingVertical: 15 }}
              onPress={() => {
                this.props.navigation.navigate("LoginScreen");
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
                Back to login
              </Text>
            </TouchableOpacity>
          </View>
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
