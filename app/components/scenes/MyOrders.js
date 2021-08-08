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
import Icon from "../../common/icons";
import { COLORS } from "../../constants/COLORS";

const { width, height } = Dimensions.get("window");

export default class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newListArray: [
        {
          id: 1,
          product: "Chocolate Donut",
          orderId: "FID 0001",
          price: "$16",
          Quantity: 5,
          image: require("../../src/donut1.jpeg"),
        },
        {
          id: 2,
          product: "Jelly Donut",
          orderId: "FID 0002",
          price: "$16",
          Quantity: 5,
          image: require("../../src/donut2.jpeg"),
        },
        {
          id: 3,
          product: "Marble-Frosted Donut",
          orderId: "FID 0003",
          price: "$16",
          Quantity: 5,
          image: require("../../src/donut3.jpeg"),
        },
        {
          id: 4,
          product: "Blueberry Donut",
          orderId: "FID 0004",
          price: "$16",
          Quantity: 5,
          image: require("../../src/donut4.jpg"),
        },
        {
          id: 5,
          product: "Rosted Nuts Chocolate",
          orderId: "FID 0005",
          price: "$16",
          Quantity: 5,
          image: require("../../src/IceCream.jpg"),
        },
      ],
      flag1: true,
      flag2: false,
    };
  }
  // This is the function, that render all processing list items using this design structure.
  onProcessRenderItems(rowData) {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("OrderDetail")}
      >
        <View
          style={{
            flex: 1,
            margin: 5,
            backgroundColor: "#fff",
            shadowOffset: { width: 0.2, height: 0.2 },
            shadowOpacity: 0.2,
            shadowColor: "black",
            padding: 5,
            elevation: 2,
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{ flex: 2, flexDirection: "column", alignItems: "center" }}
            >
              <Image
                source={rowData.item.image}
                style={{ width: 80, height: 80, resizeMode: "contain" }}
              />
            </View>
            <View style={{ flex: 4 }}>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.MAIN_GREEN,
                    fontWeight: "bold",
                    paddingVertical: 10,
                    fontFamily: "Lato-Bold",
                  }}
                >
                  {rowData.item.product} ({rowData.item.orderId})
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 25,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Lato-Bold",
                      }}
                    >
                      Price :
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: COLORS.MAIN_GREEN,
                        fontWeight: "bold",
                        fontFamily: "Lato-Bold",
                      }}
                    >
                      {rowData.item.price}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Lato-Bold",
                      }}
                    >
                      Quantity :
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: COLORS.MAIN_GREEN,
                        fontWeight: "bold",
                        fontFamily: "Lato-Bold",
                      }}
                    >
                      {rowData.item.Quantity}
                    </Text>
                  </View>
                  <View style={{ marginLeft: 15 }}>
                    <TouchableOpacity style={{ padding: 10 }}>
                      <Icon
                        name="delete"
                        family="MaterialCommunityIcons"
                        size={25}
                        color={COLORS.MAIN_GREEN}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // This is the function, that render all completed list items using this design structure.
  onCompletedRenderItems(rowData) {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("OrderDetail")}
      >
        <View
          style={{
            flex: 1,
            margin: 5,
            backgroundColor: "#fff",
            shadowOffset: { width: 0.2, height: 0.2 },
            shadowOpacity: 0.2,
            shadowColor: "black",
            padding: 5,
            elevation: 2,
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{ flex: 2, flexDirection: "column", alignItems: "center" }}
            >
              <Image
                source={rowData.item.image}
                style={{ width: 80, height: 80, resizeMode: "contain" }}
              />
            </View>
            <View style={{ flex: 4 }}>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.MAIN_GREEN,
                    fontWeight: "bold",
                    paddingVertical: 10,
                    fontFamily: "Lato-Bold",
                  }}
                >
                  {rowData.item.product} ({rowData.item.orderId})
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 25,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Lato-Bold",
                      }}
                    >
                      Price :{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: COLORS.MAIN_GREEN,
                        fontWeight: "bold",
                        fontFamily: "Lato-Bold",
                      }}
                    >
                      {rowData.item.price}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Lato-Bold",
                      }}
                    >
                      Quantity :{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: COLORS.MAIN_GREEN,
                        fontWeight: "bold",
                        fontFamily: "Lato-Bold",
                      }}
                    >
                      {rowData.item.Quantity}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={ThemeStyle.pageContainer}>
        {/* <ScrollableTabView
          initialPage={0}
          tabBarBackgroundColor={COLORS.MAIN_GREEN}
          tabBarActiveTextColor ={ThemeStyle.tabBarActiveTextColor}
          tabBarInactiveTextColor ="#FFF"
          tabBarUnderlineStyle={{backgroundColor:ThemeStyle.tabBarActiveTextColor}}
          tabBarTextStyle={{paddingTop:15,fontFamily:"Lato-Bold"}}
          // onChangeTab={this.handleChangeTab.bind(this)}
          // renderTabBar={ () => <DefaultTabBar badgeStyle={{}} />}
        >
          <View tabLabel="OnProcess" style={{flex:1}}>
            <ScrollView>
              <FlatList
                data        = {this.state.newListArray}
                renderItem  = {this.onProcessRenderItems.bind(this)}
                keyExtractor={(item, index) => item.id}
              />
            </ScrollView>
          </View>
          <View tabLabel="Completed" style={{flex:1}}>
            <ScrollView>
              <FlatList
                data        = {this.state.newListArray}
                renderItem  = {this.onCompletedRenderItems.bind(this)}
                keyExtractor={(item, index) => item.id}
              />
            </ScrollView>
          </View>
        </ScrollableTabView> */}
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
            <Text style={styles.text}>OnProcess</Text>
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
            <Text style={styles.text}>Completed</Text>

            {this.state.flag2 ? <View style={styles.bar}></View> : null}
          </TouchableOpacity>
        </View>
        {this.state.flag1 ? (
          <FlatList
            data={this.state.newListArray}
            renderItem={this.onProcessRenderItems.bind(this)}
            keyExtractor={(item, index) => item.id}
          />
        ) : (
          <FlatList
            data={this.state.newListArray}
            renderItem={this.onCompletedRenderItems.bind(this)}
            keyExtractor={(item, index) => item.id}
          />
        )}
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
    // width:50,
    backgroundColor: ThemeStyle.tabBarBackgroundColor,
  },
});
