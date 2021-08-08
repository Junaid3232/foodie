import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import ThemeStyle from "../../styles/Theme";

const { width, height } = Dimensions.get("window");

export default class InviteFriends extends Component {
  render() {
    return (
      <View style={ThemeStyle.pageContainer}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={require("../../src/bg1.jpg")}
            style={{ width: width, height: 210, resizeMode: "cover" }}
          />
        </View>
        <View
          style={{
            flex: 1.5,
            alignItems: "center",
            backgroundColor: "#fff",
            margin: 60,
            shadowOffset: { width: -1.0, height: -2.5 },
            shadowOpacity: 5,
            shadowColor: "grey",
            elevation: 3,
          }}
        >
          <View
            style={{
              flex: 1,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(209,69,93,-0.1)",
            }}
          >
            <Image
              source={require("../../src/bg1.jpg")}
              style={{
                resizeMode: "cover",
                width: null,
                height: 290,
                opacity: 0.2,
              }}
            />
          </View>
          <View style={{ paddingVertical: 20 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: ThemeStyle.textColor,
                fontFamily: "Lato-Bold",
              }}
            >
              Send gift to your Friend!
            </Text>
          </View>
          <Text style={styles.inviteText}>You can easely send gift</Text>
          <Text style={styles.inviteText}>to your natives and friends.All</Text>
          <Text style={styles.inviteText}>
            you need it's just to press send
          </Text>
          <Text style={styles.inviteText}>to friend button below.</Text>
          <View style={{ marginTop: 60 }}>
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
              <Text style={styles.text}>Invite Friends</Text>
            </TouchableOpacity>
          </View>
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
    fontStyle: "italic",
  },
  text: {
    fontSize: 15,
    fontFamily: "Lato-Bold",
    color: "#fff",
  },
});
