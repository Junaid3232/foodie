import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import ThemeStyle from "../../styles/Theme";
import Formstyle1 from "../../styles/Formstyle1";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FloatingLabel from "react-native-floating-label";

const { width, height } = Dimensions.get("window");

var t = require("tcomb-form-native");
var Form = t.form.Form;
// here we are: define your domain model
var Person = t.struct({
  address1: t.String,
  address2: t.String,
  city: t.String,
  state: t.String,
  country: t.String,
  zipcode: t.Number,
});
var options = {
  fields: {
    address1: {
      label: "address1",
      auto: "none",
      placeholderTextColor: "#151356",
      factory: FloatingLabel,
      stylesheet: Formstyle1.form,
    },
    address2: {
      label: "address2",
      auto: "none",
      placeholderTextColor: "#151356",
      factory: FloatingLabel,
      stylesheet: Formstyle1.form,
    },
    city: {
      label: "city",
      auto: "none",
      placeholderTextColor: "#151356",
      factory: FloatingLabel,
      stylesheet: Formstyle1.form,
    },
    state: {
      label: "state",
      auto: "none",
      placeholderTextColor: "#151356",
      factory: FloatingLabel,
      stylesheet: Formstyle1.form,
    },
    country: {
      label: "country",
      auto: "none",
      placeholderTextColor: "#151356",
      factory: FloatingLabel,
      stylesheet: Formstyle1.form,
    },
    zipcode: {
      label: "zipcode",
      auto: "none",
      placeholderTextColor: "#151356",
      factory: FloatingLabel,
      stylesheet: Formstyle1.form,
    },
  },
};

export default class WorkAddress extends Component {
  // This is the function, that executes while pressing submit actions ..
  onSubmitPress() {
    var value = this.refs.form.getValue();
    if (value) {
      // if validation fails, value will be null
      alert("Billing Information Submitted");
    }
  }

  render() {
    return (
      <View style={ThemeStyle.pageContainer}>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <Form ref="form" type={Person} options={options} />
          </View>
        </KeyboardAwareScrollView>
        <View style={{ marginTop: 0 }}>
          <TouchableOpacity
            style={[
              ThemeStyle.buttonColor,
              {
                borderRadius: 0,
                fontFamily: "Lato-Regular",
                alignContent: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inviteText: {
    fontSize: 15,
    textAlign: "center",
    paddingVertical: 1,
    backgroundColor: "transparent",
  },
  container: {
    paddingBottom: 20,
    paddingTop: 20,
    margin: 10,
    elevation: 3,
    backgroundColor: "white",
    shadowOffset: { width: -0.5, height: -0.5 },
    shadowOpacity: 3,
    shadowColor: "grey",
  },
  text: {
    fontSize: 15,
    fontFamily: "Lato-Bold",
    color: "#fff",
  },
});
