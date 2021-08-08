import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ImageBackground,
  AsyncStorage,
} from "react-native";
import ThemeStyle from "../../styles/Theme";
import Icon from "../../common/icons";

const { width, height } = Dimensions.get("window");

const latitudeDelta = 0.02632;
const longitudeDelta = 0.03632;
const latitude = 13.0106;
const longitude = 80.1932;

export default class RestaurantDetail extends Component {
  constructor({ navigation }) {
    //destructuring for navigation
    super({ navigation });
    this.state = {
      item: navigation.state.params.item,
      newListArray: [
        {
          id: 1,
          name: "Roll Paratha",
        },
        {
          id: 2,
          name: "BBQ",
        },
        {
          id: 3,
          name: "Biryani",
        },
        {
          id: 4,
          name: "Chicken",
        },
        {
          id: 5,
          name: "Pulao",
        },
      ],
      listArray: [
        {
          id: 1,
          name: "Chicken Seekh kabab Roll Paratha",
          description:
            "Chicken seekh kabab topped with chutney. Served with a home made paratha",
          price: "269.00",
          image: require("../../src/roll.jpeg"),
        },
        {
          id: 2,
          name: "Garlic Mayo Chicken Roll Paratha",
          description:
            "Chicken seekh kabab topped with chutney. Served with a home made paratha",
          price: "269.00",
          image: require("../../src/roll.jpeg"),
        },
        {
          id: 3,
          name: "Chicken Roll Paratha",
          description:
            "Chicken seekh kabab topped with chutney. Served with a home made paratha",
          price: "269.00",
        },
      ],
    };
  }
  SaveOrder = async (item) => {
    const getOrder = await AsyncStorage.getItem("Order");
    console.log("getOrder", getOrder);
    let order = JSON.parse(getOrder);
    if (!order) {
      order = [];
    }
    order.push(item);
    this.setState({ Loading: true });
    await AsyncStorage.setItem("Order", JSON.stringify(order))
      .then((order) => {
        console.log("It was saved successfully", order);
        this.setState({ Loading: false });
        this.props.navigation.navigate("Carti", { item: item });
      })
      .catch(() => {
        console.log("There was an error saving the product");
      });
  };
  renderItems(rowData) {
    return (
      <View style={styles.cardView}>
        <Text style={styles.cardText}>{rowData.item.itemName}</Text>
        <FlatList
          data={rowData.item.subItemArray}
          keyExtractor={(item, index) => index}
          renderItem={(detail) => {
            return (
              <TouchableOpacity
                style={styles.innercard}
                onPress={() => {
                  this.SaveOrder(detail.item);
                }}
              >
                <View style={styles.cardTopView}>
                  <View>
                    <Text style={styles.innerCardtext} numberOfLines={1}>
                      {detail.item.subItemName}
                    </Text>
                    <Text
                      style={[
                        styles.description,
                        { width: detail.item.image !== "" ? 180 : 350 },
                      ]}
                      numberOfLines={3}
                    >
                      {detail.item.description}
                    </Text>
                    <Text
                      style={[
                        styles.priceText,
                        {
                          alignSelf:
                            detail.item.image !== ""
                              ? "flex-start"
                              : "flex-end",
                        },
                      ]}
                      numberOfLines={1}
                    >
                      Rs. {detail.item.subItemPrice}{" "}
                    </Text>
                  </View>
                  {detail.item.image ? (
                    <Image
                      source={{ uri: detail.item.image }}
                      style={styles.cardImage}
                    />
                  ) : null}
                </View>
                {detail.index === this.state.listArray.length - 1 ? (
                  <View style={{ marginTop: 10 }}></View>
                ) : (
                  <View style={styles.lineSeperator}></View>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
  render() {
    return (
      <View style={ThemeStyle.pageContainer}>
        <ScrollView>
          <View>
            <ImageBackground
              source={{ uri: this.state.item.image }}
              style={styles.image}
            >
              <View style={styles.overLay}>
                <View style={styles.icon}></View>
                <Text style={styles.text}>{this.state.item.name}</Text>
                <View style={styles.timeView}>
                  <Text style={styles.text1}>
                    Delivery {this.state.item.time} min
                  </Text>
                </View>
                <View style={styles.innerView}>
                  <Icon name="star" family="Entypo" size={18} color={"#fff"} />
                  <Text style={styles.innerText1}>
                    {this.state.item.rating}
                  </Text>
                  <Text style={styles.innerText}>
                    ({this.state.item.number})
                  </Text>
                </View>
              </View>
            </ImageBackground>

            <FlatList
              data={this.state.item.itemArray}
              renderItem={this.renderItems.bind(this)}
              keyExtractor={(item, index) => index}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 240,
    resizeMode: "cover",
    zIndex: 1,
  },
  overLay: {
    width: width,
    height: 240,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  icon: {
    marginTop: 70,
    marginLeft: 20,
  },
  text: {
    color: "#fff",
    fontFamily: "Lato-Black",
    fontSize: 22,
    marginTop: 20,
    alignSelf: "center",
    marginHorizontal: 10,
    textAlign: "center",
  },
  timeView: {
    height: 28,
    width: 130,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  text1: {
    color: "#fff",
    fontFamily: "Lato-Regular",
    fontSize: 15,
  },
  innerView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  innerText: {
    color: "#fff",
    fontFamily: "Lato-Regular",
    fontSize: 16,
  },
  innerText1: {
    color: "#fff",
    fontFamily: "Lato-Regular",
    fontSize: 16,
  },
  cardView: {
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 5,
  },
  cardText: {
    fontFamily: "Lato-Bold",
    fontSize: 20,
    margin: 10,
  },
  innercard: {
    marginHorizontal: 10,
    marginTop: 5,
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
  },
  innerCardtext: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
  },
  cardTopView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  description: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    color: "grey",
    width: 300,
  },
  cardImage: {
    height: 80,
    width: 80,
    borderRadius: 5,
  },
  priceText: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    marginTop: 7,
    alignContent: "flex-end",
  },
  lineSeperator: {
    height: 0.5,
    width: "100%",
    marginVertical: 10,
    backgroundColor: "lightgrey",
  },
});
