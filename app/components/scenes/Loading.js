import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
class Loading extends Component {
  state = {};
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <ActivityIndicator size={20} color={"#fff"} style={{}} />
      </View>
    );
  }
}

export default Loading;
