import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ThemeStyle from "../../styles/Theme";
import HomeAddress from "./HomeAddress";
import WorkAddress from "./WorkAddress";

export default class BillingAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag1: true,
      flag2: false,
    };
  }
  render() {
    return (
      <View style={ThemeStyle.pageContainer}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            flexDirection: "row",
            paddingVertical: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({
                flag1: true,
                flag2: false,
              });
            }}
          >
            <Text style={styles.text}>Home Address</Text>
            {this.state.flag1 ? <View style={styles.bar}></View> : null}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({
                flag1: false,
                flag2: true,
              });
            }}
          >
            <Text style={styles.text}>Work Address</Text>

            {this.state.flag2 ? <View style={styles.bar}></View> : null}
          </TouchableOpacity>
        </View>
        {this.state.flag1 ? <HomeAddress /> : <WorkAddress />}
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
  text: {
    fontFamily: "Lato-Bold",
    fontSize: 18,
  },
  bar: {
    marginTop: 10,
    height: 1,
    backgroundColor: ThemeStyle.tabBarBackgroundColor,
  },
});
