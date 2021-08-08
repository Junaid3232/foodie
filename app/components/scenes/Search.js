import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
} from "react-native";
import ThemeStyle from "../../styles/Theme";
// import STRINGS from "../../constants/STRINGS";
import Icon from "../../common/icons";
//import MapView from 'react-native-maps';
import { COLORS } from "../../constants/COLORS";
import ScrollableTabView, {
  DefaultTabBar,
} from "react-native-scrollable-tab-view";

const { width, height } = Dimensions.get("window");

const latitudeDelta = 0.02632;
const longitudeDelta = 0.03632;
const latitude = 13.0106;
const longitude = 80.1932;

export default class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantListArray: [
        {
          rating: "3.5",
          name: "Golden Chick",
          miles: "0.24 miles",
          address: "10G,North high way,2nd south street,New york",
          food: "Burgers,Pizza,Tandori,Sandwich",
        },
        {
          rating: "4",
          name: "Famous Dave",
          miles: "0.34 miles",
          address: "55,New street,Virginia",
          food: "Burgers,Pizza,Sandwich",
        },
        {
          rating: "5",
          name: "Damon's Grill",
          miles: "0.45 miles",
          address: "Southern road,John crew street,New jersy",
          food: "Pizza,Tandori,Sandwich",
        },
        {
          rating: "4.5",
          name: "Bob Evans Restaurants",
          miles: "1 miles",
          address: "4735B,Patherol Road,3rd Fiber street,Canada",
          food: "Pizza,Tandori",
        },
      ],
      flag1: true,
    };
  }
  // this is a functions to list restauants with this design model
  renderRestaurantListItems(rowData) {
    return (
      <View style={styles.listContainer}>
        <View
          style={{
            flex: 0.5,
            backgroundColor: "#FFF",
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRightWidth: 0.5,
            borderColor: "lightgrey",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../src/teechowicon.png")}
            resizeMode={"contain"}
            style={{ height: 50, width: 50 }}
          />
        </View>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Cart")}
          style={{
            flex: 2,
            backgroundColor: "#FFF",
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRightWidth: 0.5,
            borderColor: "lightgrey",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 14,
                  color: "#3d3d3d",
                  fontWeight: "bold",
                  fontFamily: "Lato-Bold",
                }}
              >
                {rowData.item.name}
              </Text>
            </View>
            <View style={{ flex: 0.5, flexDirection: "row" }}>
              <Icon
                name="location-pin"
                family="SimpleLineIcons"
                size={15}
                color="grey"
              />
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 12,
                  color: "grey",
                  fontFamily: "Lato-Regular",
                }}
              >
                {rowData.item.miles}
              </Text>
            </View>
          </View>
          <Text
            numberOfLines={1}
            style={{ fontSize: 12, color: "grey", fontFamily: "Lato-Regular" }}
          >
            {rowData.item.address}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              color: "#3d3d3d",
              fontFamily: "Lato-Regular",
            }}
          >
            {rowData.item.food}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={ThemeStyle.pageContainer}>
        <View
          style={{
            backgroundColor: COLORS.MAIN_GREEN,
            flex: 0.3,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              paddingVertical: 10,
              alignItems: "center",
              borderColor: COLORS.MAIN_GREEN,
              borderWidth: 1,
              backgroundColor: "#fff",
              justifyContent: "center",
              marginLeft: 20,
              marginRight: 20,
              borderRadius: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 15,
              }}
            >
              <Icon name="search" family="Feather" size={20} color="#000" />
              <TextInput
                style={{
                  height: 40,
                  width: 300,
                  paddingHorizontal: 5,
                  fontSize: 14,
                  fontFamily: "Lato-Regular",
                }}
                onChangeText={(text) => this.setState({ text })}
                value={this.state.text}
                underlineColorAndroid="transparent"
                placeholder="Search by food"
                placeholderTextColor="grey"
              />
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity>
            <Image
              source={require("../../src/map1.png")}
              style={{
                resizeMode: "cover",
                width: Dimensions.get("window").width,
                height: 290,
              }}
            />
          </TouchableOpacity>
        </View>
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
                flag3: false,
                flag4: false,
              });
            }}
          >
            <Text style={styles.text}>Chinese</Text>
            {this.state.flag1 ? <View style={styles.bar}></View> : null}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                flag1: false,
                flag2: true,
                flag3: false,
                flag4: false,
              });
            }}
          >
            <Text style={styles.text}>Italian</Text>

            {this.state.flag2 ? <View style={styles.bar}></View> : null}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                flag1: false,
                flag2: false,
                flag3: true,
                flag4: false,
              });
            }}
          >
            <Text style={styles.text}>Thai</Text>
            {this.state.flag3 ? <View style={styles.bar}></View> : null}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                flag1: false,
                flag2: false,
                flag3: false,
                flag4: true,
              });
            }}
          >
            <Text style={styles.text}>Desi</Text>
            {this.state.flag4 ? <View style={styles.bar}></View> : null}
          </TouchableOpacity>
        </View>
        <View style={{ flex: 2, backgroundColor: "transparent" }}>
          <FlatList
            data={this.state.restaurantListArray}
            renderItem={this.renderRestaurantListItems.bind(this)}
            keyExtractor={(item, index) => index}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderBottomWidth: 0.5,
    borderColor: "lightgrey",
  },
  map: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
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
