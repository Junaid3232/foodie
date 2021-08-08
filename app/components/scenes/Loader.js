import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import ThemeStyle from "../../styles/Theme";

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
        <ActivityIndicator
          size={"large"}
          color={ThemeStyle.tabBarBackgroundColor}
          style={{}}
        />
      </View>
    );
  }
}

export default Loading;
