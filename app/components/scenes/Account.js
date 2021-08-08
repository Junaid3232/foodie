import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import ThemeStyle from "../../styles/Theme";
import Icon from "../../common/icons";
import { COLORS } from "../../constants/COLORS";
import Theme from "../../styles/Theme";
import Modal from "react-native-modal";
const { width, height } = Dimensions.get("window");

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      loading: false,
    };
  }
  Logout = async () => {
    this.setState({ isModalVisible: true });
  };

  ClearUserAvatar = async () => {
    AsyncStorage.setItem("firstTime", "Yes");
    AsyncStorage.setItem("firstTimeDialog", "Yes");
  };

  LogoutPress = async () => {
    this.setState({ loading: true });
    await AsyncStorage.removeItem("userId")
      .then(() => {
        this.setState({ isModalVisible: false });
        this.props.navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        alert(error);
      });
  };
  render() {
    return (
      <View style={ThemeStyle.pageContainer}>
        <ScrollView>
          <View>
            <Image
              source={require("../../src/account_bg.jpeg")}
              style={{ width: width, height: 200, resizeMode: "cover" }}
            />
          </View>
          <View style={{ flex: 3 }}>
            <View style={{ borderBottomWidth: 0.5, borderColor: "lightgrey" }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Profile")}
              >
                <View style={styles.container}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                      name="user"
                      family="Entypo"
                      size={22}
                      color={COLORS.MAIN_GREEN}
                    />
                    <Text style={styles.textlist}> Profile </Text>
                  </View>
                  <Icon
                    name="chevron-thin-right"
                    family="Entypo"
                    size={20}
                    color="#4f5154"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ borderBottomWidth: 0.5, borderColor: "lightgrey" }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("MyOrders")}
              >
                <View style={styles.container}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                      name="first-order"
                      family="FontAwesome"
                      size={20}
                      color={COLORS.MAIN_GREEN}
                    />
                    <Text style={styles.textlist}> My Orders </Text>
                  </View>
                  <Icon
                    name="chevron-thin-right"
                    family="Entypo"
                    size={20}
                    color="#4f5154"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ borderBottomWidth: 0.5, borderColor: "lightgrey" }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("BillingAddress")}
              >
                <View style={styles.container}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                      name="address"
                      family="Entypo"
                      size={20}
                      color={COLORS.MAIN_GREEN}
                    />
                    <Text style={styles.textlist}> Billing Address </Text>
                  </View>
                  <Icon
                    name="chevron-thin-right"
                    family="Entypo"
                    size={20}
                    color="#4f5154"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ borderBottomWidth: 0.5, borderColor: "lightgrey" }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("inviteFriends")}
              >
                <View style={styles.container}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                      name="ios-people"
                      family="Ionicons"
                      size={25}
                      color={COLORS.MAIN_GREEN}
                    />
                    <Text style={styles.textlist}> Invite Friends </Text>
                  </View>
                  <Icon
                    name="chevron-thin-right"
                    family="Entypo"
                    size={20}
                    color="#4f5154"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ borderBottomWidth: 0.5, borderColor: "lightgrey" }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Aboutus")}
              >
                <View style={styles.container}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                      name="info"
                      family="Entypo"
                      size={22}
                      color={COLORS.MAIN_GREEN}
                    />
                    <Text style={styles.textlist}> About us </Text>
                  </View>
                  <Icon
                    name="chevron-thin-right"
                    family="Entypo"
                    size={20}
                    color="#4f5154"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ borderBottomWidth: 0.5, borderColor: "lightgrey" }}>
              <TouchableOpacity onPress={() => this.Logout()}>
                <View style={styles.container}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                      name="logout"
                      family="SimpleLineIcons"
                      size={22}
                      color={COLORS.MAIN_GREEN}
                    />
                    <Text style={styles.textlist}> Logout </Text>
                  </View>
                  <Icon
                    name="chevron-thin-right"
                    family="Entypo"
                    size={20}
                    color="#4f5154"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Modal
          transparent
          overlayBackgroundColor={"rgba(0,0,0,.9)"}
          style={{
            borderTopLeftRadius: 50,
            height: "30%",
            alignSelf: "center",
          }}
          visible={this.state.isModalVisible}
          swipeDirection={["up"]}
          animationIn={"slideInUp"}
          animationOut={"slideOutDown"}
          onRequestClose={() => {}}
          width={"80%"}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {"Are you sure you want to Logout?"}
            </Text>
            {this.state.loading ? (
              <View style={{ marginTop: 10 }}>
                <ActivityIndicator
                  size={20}
                  color={ThemeStyle.tabBarBackgroundColor}
                  style={{}}
                />
              </View>
            ) : null}
            <View
              style={[
                styles.buttonView,
                { marginTop: this.state.loading ? "15%" : "20%" },
              ]}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.LogoutPress();
                  this.ClearUserAvatar();
                }}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => {
                  this.setState({ isModalVisible: false });
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textlist: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20,
    color: "black",
    fontFamily: "Lato-Bold",
  },
  modalView: {
    backgroundColor: "white",
    height: "23%",
    borderRadius: 20,
    alignItems: "center",
    // height:'30%'
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    fontFamily: "Lato-Bold",
    marginTop: 40,
    alignSelf: "center",
    width: "80%",
    textAlign: "center",
  },
  buttonView: {
    marginTop: "20%",
    flexDirection: "row",
    width: "100%",
  },
  button: {
    height: 60,
    width: "50%",
    backgroundColor: Theme.tabBarBackgroundColor,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "grey",
    borderBottomLeftRadius: 20,
  },
  button1: {
    height: 60,
    width: "50%",
    backgroundColor: Theme.tabBarBackgroundColor,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 20,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Lato-Bold",
  },
});
