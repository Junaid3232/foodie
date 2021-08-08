import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import ThemeStyle from "../../styles/Theme";
import Icon from "../../common/icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { width, height } = Dimensions.get("window");

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "Mugunthan B",
      Email: "test123@yopmail.com",
      number: "1234567890",
      oldpwd: "123456",
      newpwd: "123456789",
      cnfrmpwd: "123456789",
      account: true,
      Password: true,
    };
  }

  // this action takes place while pressing My Account text
  onPressMyAccount() {
    this.setState({ Password: false, account: true });
  }
  // this action takes place while pressing Password text
  onPressPassword() {
    this.setState({ account: false, Password: true });
  }

  render() {
    return (
      <View style={ThemeStyle.pageContainer}>
        <KeyboardAwareScrollView>
          <View
            style={{
              flex: 1.5,
              backgroundColor: ThemeStyle.tabBarBackgroundColor,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../src/user.png")}
              style={{ width: 80, height: 80, borderRadius: 80 / 2 }}
            />
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                fontWeight: "bold",
                paddingVertical: 5,
                fontFamily: "Lato-Black",
              }}
            >
              Mugunthan B
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              backgroundColor: ThemeStyle.tabBarBackgroundColor,
              paddingVertical: 5,
            }}
          >
            <TouchableOpacity onPress={() => this.onPressMyAccount()}>
              <View
                style={{
                  backgroundColor: ThemeStyle.profileButtonColor,
                  padding: 10,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                    fontFamily: "Lato-Regular",
                  }}
                >
                  My Account
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressPassword()}>
              <View
                style={{
                  backgroundColor: ThemeStyle.profileButtonColor,
                  padding: 10,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                    fontFamily: "Lato-Regular",
                  }}
                >
                  Password
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {this.state.account ? (
            <View
              style={{
                flex: 3,
                backgroundColor: "#fff",
                margin: 10,
                shadowOffset: { width: -1.0, height: -2.5 },
                shadowOpacity: 5,
                shadowColor: "grey",
                padding: 10,
                alignItems: "center",
                elevation: 3,
              }}
            >
              <View style={styles.formContainer}>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "grey",
                      fontFamily: "Lato-Regular",
                    }}
                  >
                    User Name:
                  </Text>
                </View>
                <View
                  style={{
                    flex: 3,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(userName) => this.setState({ userName })}
                    value={this.state.userName}
                    underlineColorAndroid="transparent"
                    placeholder="User Name"
                    placeholderTextColor="grey"
                  />
                </View>
              </View>
              <View style={styles.formContainer}>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "grey",
                      fontFamily: "Lato-Regular",
                    }}
                  >
                    Email:
                  </Text>
                </View>
                <View
                  style={{
                    flex: 3,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(Email) => this.setState({ Email })}
                    value={this.state.Email}
                    underlineColorAndroid="transparent"
                    placeholder="Email"
                    placeholderTextColor="grey"
                  />
                </View>
              </View>
              <View style={styles.formContainer}>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "grey",
                      fontFamily: "Lato-Regular",
                    }}
                  >
                    Phone Number:
                  </Text>
                </View>
                <View
                  style={{
                    flex: 3,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(number) => this.setState({ number })}
                    value={this.state.number}
                    underlineColorAndroid="transparent"
                    placeholder="Contact Number"
                    placeholderTextColor="grey"
                  />
                </View>
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 3,
                backgroundColor: "#fff",
                margin: 10,
                shadowOffset: { width: -1.0, height: -2.5 },
                shadowOpacity: 5,
                shadowColor: "grey",
                padding: 10,
                elevation: 3,
              }}
            >
              <View style={styles.formContainer}>
                <View
                  style={{
                    flex: 2,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "grey",
                      fontFamily: "Lato-Regular",
                    }}
                  >
                    Old Password:
                  </Text>
                </View>
                <View
                  style={{
                    flex: 3,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(oldpwd) => this.setState({ oldpwd })}
                    value={this.state.oldpwd}
                    underlineColorAndroid="transparent"
                    placeholder="Old Password"
                    placeholderTextColor="grey"
                  />
                </View>
              </View>
              <View style={styles.formContainer}>
                <View
                  style={{
                    flex: 2,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "grey",
                      fontFamily: "Lato-Regular",
                    }}
                  >
                    New Password:
                  </Text>
                </View>
                <View
                  style={{
                    flex: 3,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(newpwd) => this.setState({ newpwd })}
                    value={this.state.newpwd}
                    underlineColorAndroid="transparent"
                    placeholder="New Password"
                    placeholderTextColor="grey"
                  />
                </View>
              </View>
              <View style={styles.formContainer}>
                <View
                  style={{
                    flex: 2,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "grey",
                      fontFamily: "Lato-Regular",
                    }}
                  >
                    Confirm Password:
                  </Text>
                </View>
                <View
                  style={{
                    flex: 3,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(cnfrmpwd) => this.setState({ cnfrmpwd })}
                    value={this.state.cnfrmpwd}
                    underlineColorAndroid="transparent"
                    placeholder="Confirm Password"
                    placeholderTextColor="grey"
                  />
                </View>
              </View>
            </View>
          )}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "lightgrey",
    paddingVertical: 25,
  },
  textInput: {
    height: 40,
    width: 300,
    fontSize: 14,
    fontFamily: "Lato-Regular",
  },
});
