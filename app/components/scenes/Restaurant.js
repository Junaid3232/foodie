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
  Modal,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import ThemeStyle from "../../styles/Theme";
import Icon from "../../common/icons";
import { connect } from "react-redux";
import {
  getDataListings,
  getFeaturedListings,
} from "../../store/actions/action";
import { saveData, getData, addToArray } from "../../utilts/utility";
import Loading from "./Loading";
const screenHeight = Dimensions.get("window").height;
import subimg1 from "../../src/m1.jpeg";
import subimg2 from "../../src/m5.jpeg";
import subimg3 from "../../src/m6.jpeg";
import subimg4 from "../../src/m4.jpeg";
import subimg5 from "../../src/m3.jpeg";
import subimg6 from "../../src/m2.jpeg";
import subimg7 from "../../src/m7.jpeg";
import subimg8 from "../../src/m8.jpeg";
import subimg9 from "../../src/m9.jpeg";
import subimg10 from "../../src/m10.jpeg";

const simg1 = Image.resolveAssetSource(subimg1).uri;
const simg2 = Image.resolveAssetSource(subimg2).uri;
const simg3 = Image.resolveAssetSource(subimg3).uri;
const simg4 = Image.resolveAssetSource(subimg4).uri;
const simg5 = Image.resolveAssetSource(subimg5).uri;
const simg6 = Image.resolveAssetSource(subimg6).uri;
const simg7 = Image.resolveAssetSource(subimg7).uri;
const simg8 = Image.resolveAssetSource(subimg8).uri;
const simg9 = Image.resolveAssetSource(subimg9).uri;
const simg10 = Image.resolveAssetSource(subimg10).uri;

class Restaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      restaurantListArray: [],
      faeturedListArray: [],
      liked: false,
      visible: false,
      modalFlag: false,
      item: {},
      filter: "",
      newListArray: [
        {
          rating: "4",
          name: "KFC",
          miles: "0.24 miles",
          address: "Street 40,New york",
          food: "Burgers,Sandwich",
          image: simg7,
          number: 443,
          price: 200,
          time: 10,
          itemArray: [
            {
              itemName: "Family Festival",
              subItemArray: [
                {
                  subItemName: "Family Festival 1",
                  quantity: 1,
                  subItemPrice: "2000",
                  description:
                    "2 Krunch Burgers + 4 Pcs Chicken + 2 Dinner Rolls + 1.5 Ltr Drink",
                  image: "",
                },
                {
                  subItemName: "Family Festival 2",
                  subItemPrice: "3000",
                  quantity: 1,
                  description:
                    "5 Krunch Burgers + 4 Pcs Chicken + 2 Dinner Rolls + 1.5 Ltr Drink",
                  image: "",
                },
                {
                  subItemName: "Family Festival 3",
                  subItemPrice: "5000",
                  quantity: 1,
                  description:
                    "6 Krunch Burgers + 4 Pcs Chicken + 2 Dinner Rolls + 1.5 Ltr Drink",
                  image: "",
                },
              ],
            },
            {
              itemName: "Super Discounted Deals",
              subItemArray: [
                {
                  subItemName: "Deal 1",
                  subItemPrice: "5100",
                  quantity: 1,
                  description: "Medium pizza & 500ml drink",
                  image: "",
                },
                {
                  subItemName: "Deal 2",
                  subItemPrice: "3100",
                  quantity: 1,
                  description:
                    "2 Zinger burgers, 2 grilled burgers, zinger paratha/shawarma, large fries & 1.5 litre soft drink",
                  image: "",
                },
                {
                  subItemName: "Deal 1",
                  subItemPrice: "3000",
                  quantity: 1,
                  description:
                    "Zinger burger, grilled burger, half crispy chicken, large fries & 1.5 litre soft drink",
                  image: "",
                },
              ],
            },
            {
              itemName: "Special Thali",
              subItemArray: [
                {
                  subItemName: "Thali 1",
                  subItemPrice: "600",
                  quantity: 1,
                  description:
                    "Chapati or paratha, seekh kabab, tikka, bihari boti, butter chicken & soft drink",
                  image: "",
                },
                {
                  subItemName: "Thali 2",
                  subItemPrice: "750",
                  quantity: 1,
                  description:
                    "2 Chapati, 2 paratha, 2 beef kabab, butter chicken, fried fish, tea or soft drink, raita & salad",
                  image: "",
                },
                {
                  subItemName: "Thali 3",
                  subItemPrice: "1490",
                  quantity: 1,
                  description:
                    "Biryani, kabab, beef tikka boti, malai boti & soft drink",
                  image: "",
                },
              ],
            },
          ],
        },
        {
          rating: "4",
          name: "McDonalds",
          miles: "0.84 miles",
          address: "i10, Islamab",
          food: "Burgers,Sandwich",
          image: simg10,
          number: 343,
          price: 230,
          time: 15,
          itemArray: [
            {
              itemName: " Festival",
              subItemArray: [
                {
                  subItemName: "Festival 1",
                  quantity: 1,
                  subItemPrice: "2000",
                  description:
                    "Rice + 4 Pcs Chicken + 2 Dinner Rolls + 1.5 Ltr Drink",
                  image: "",
                },
                {
                  subItemName: " Festival 2",
                  subItemPrice: "3000",
                  quantity: 1,
                  description:
                    "5 Krunch Burgers + 4 Pcs Chicken + 2 Dinner Rolls + 1.5 Ltr Drink",
                  image: "",
                },
                {
                  subItemName: " Festival 3",
                  subItemPrice: "5000",
                  quantity: 1,
                  description:
                    "6 Krunch Burgers + 4 Pcs Chicken + 2 Dinner Rolls + 1.5 Ltr Drink",
                  image: "",
                },
              ],
            },
            {
              itemName: "Discounted Deals",
              subItemArray: [
                {
                  subItemName: "Deal 1",
                  subItemPrice: "5100",
                  quantity: 1,
                  description: "Medium pizza & 500ml drink",
                  image: "",
                },
                {
                  subItemName: "Deal 2",
                  subItemPrice: "3100",
                  quantity: 1,
                  description:
                    "2 Zinger burgers, 2 grilled burgers, zinger paratha/shawarma, large fries & 1.5 litre soft drink",
                  image: "",
                },
                {
                  subItemName: "Deal 1",
                  subItemPrice: "3000",
                  quantity: 1,
                  description:
                    "Zinger burger, grilled burger, half crispy chicken, large fries & 1.5 litre soft drink",
                  image: "",
                },
              ],
            },
            {
              itemName: "Special Thali",
              subItemArray: [
                {
                  subItemName: "Thali 1",
                  subItemPrice: "600",
                  quantity: 1,
                  description:
                    "Chapati or paratha, seekh kabab, tikka, bihari boti, butter chicken & soft drink",
                  image: "",
                },
                {
                  subItemName: "Thali 2",
                  subItemPrice: "750",
                  quantity: 1,
                  description:
                    "2 Chapati, 2 paratha, 2 beef kabab, butter chicken, fried fish, tea or soft drink, raita & salad",
                  image: "",
                },
                {
                  subItemName: "Thali 3",
                  subItemPrice: "1490",
                  quantity: 1,
                  description:
                    "Biryani, kabab, beef tikka boti, malai boti & soft drink",
                  image: "",
                },
              ],
            },
          ],
        },
        {
          rating: "4.5",
          name: "Optp",
          miles: "0.34 miles",
          address: "Street 12,New street,Virginia",
          food: "Burgers,Finger chips",
          image: simg8,
          number: 300,
          price: 700,
          time: 15,
          itemArray: [
            {
              itemName: "New Arrival Deals",
              subItemArray: [
                {
                  subItemName: "New Arrival 1",
                  subItemPrice: "2000",
                  quantity: 1,
                  description: "Chicken matka biryani & 500ml drink",
                  image: "",
                },
                {
                  subItemName: "New Arrival 2",
                  subItemPrice: "2000",
                  quantity: 1,
                  description: "Beef matka biryani & 500ml drink",
                  image: "",
                },
                {
                  subItemName: "New Arrival 3",
                  subItemPrice: "4000",
                  quantity: 1,
                  description: "Mutton matka biryani & 500ml drink",
                  image: "",
                },
              ],
            },
            {
              itemName: "Super Discounted Deals",
              subItemArray: [
                {
                  subItemName: "Deal 1",
                  subItemPrice: "5100",
                  quantity: 1,
                  description: "Medium pizza & 500ml drink",
                  image: "",
                },
                {
                  subItemName: "Deal 2",
                  subItemPrice: "3100",
                  quantity: 1,
                  description:
                    "2 Zinger burgers, 2 grilled burgers, zinger paratha/shawarma, large fries & 1.5 litre soft drink",
                  image: "",
                },
                {
                  subItemName: "Deal 1",
                  subItemPrice: "3000",
                  quantity: 1,
                  description:
                    "Zinger burger, grilled burger, half crispy chicken, large fries & 1.5 litre soft drink",
                  image: "",
                },
              ],
            },
            {
              itemName: "Special Thali",
              subItemArray: [
                {
                  subItemName: "Thali 1",
                  subItemPrice: "600",
                  quantity: 1,
                  description:
                    "Chapati or paratha, seekh kabab, tikka, bihari boti, butter chicken & soft drink",
                  image: "",
                },
                {
                  subItemName: "Thali 2",
                  subItemPrice: "750",
                  quantity: 1,
                  description:
                    "2 Chapati, 2 paratha, 2 beef kabab, butter chicken, fried fish, tea or soft drink, raita & salad",
                  image: "",
                },
                {
                  subItemName: "Thali 3",
                  subItemPrice: "1490",
                  quantity: 1,
                  description:
                    "Biryani, kabab, beef tikka boti, malai boti & soft drink",
                  image: "",
                },
              ],
            },
          ],
        },
        {
          rating: "5",
          name: "Subway",
          miles: "0.45 miles",
          address: "I8 Markaz, Islamabad",
          food: "Sandwich",
          image: simg9,
          number: 55,
          price: 400,
          time: 25,
          itemArray: [
            {
              itemName: "Exclusive Discounted Deals",
              subItemArray: [
                {
                  subItemName: "Deal 1",
                  subItemPrice: "2000",
                  quantity: 1,
                  description:
                    "Crunch burger or beef burger & regular fries with free soft drink",
                  image: "",
                },
                {
                  subItemName: "Deal 2",
                  subItemPrice: "1200",
                  quantity: 1,
                  description:
                    "Crunch burger, piece fried chicken & regular fries with free soft drink",
                  image: "",
                },
                {
                  subItemName: "Super Family Deal",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Large pizza, family fries, 2 crunch burger & 8 fried chicken pieces with free 1.5 litre soft drink",
                  image: "",
                },
              ],
            },
            {
              itemName: "Dainty's Special",
              subItemArray: [
                {
                  subItemName: "Dainty Fried Chicken",
                  subItemPrice: "500",
                  quantity: 1,
                  description:
                    "Fried chicks topped with onion straws and a pickle slice. Served with fries",
                  image: "",
                },
                {
                  subItemName: "Club Sandwich",
                  subItemPrice: "700",
                  quantity: 1,
                  description:
                    "A pair of specially marinated boneless chicken & served with mushroom sauce",
                  image: "",
                },
                {
                  subItemName: "Big Burger",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Melted pepper jack cheese, jalapenos, bacon & spicy chili ketchup",
                  image: "",
                },
              ],
            },
            {
              itemName: "Steak",
              subItemArray: [
                {
                  subItemName: "Polo Tuscany",
                  subItemPrice: "600",
                  quantity: 1,
                  description:
                    "Chicken fillets with cheese grilled on top & served with pepper sauce",
                  image: "",
                },
                {
                  subItemName: "Chicken Steak",
                  subItemPrice: "750",
                  quantity: 1,
                  description:
                    "A pair of specially marinated boneless chicken & served with mushroom sauce",
                  image: "",
                },
                {
                  subItemName: "Italian Pepper Steak",
                  subItemPrice: "1490",
                  quantity: 1,
                  description:
                    "Marinated boneless chicken grilled & topped with pepper sauce",
                  image: "",
                },
              ],
            },
          ],
        },
      ],
    };
  }

  componentDidMount = () => {
    this.getFoodListdata().then(() => {
      this.props.getDataListings(this.state.restaurantListArray); // redux store
    });

    this.getFeaturedListdata().then(() => {
      this.props.getFeaturedListings(this.state.faeturedListArray);
    });
    this.getFilterData();
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.foodArray != this.state.foodArray) {
      this.getFoodListdata();
      this.getFeaturedListdata();
      this.getFilterData();
    }
  };

  AddToWishList = async () => {
    this.setState({ modalLoading: true });
    this.setState({ modalLoading: true });
    AsyncStorage.getItem("userId").then(async (res) => {
      await addToArray("Users", res, "WhishList", this.state.item)
        .then((data) => {
          this.setState({ visible: false, modalLoading: false });
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
  };
  getFoodListdata = async () => {
    this.setState({ loading: true });
    return await getData("FoodList", "kwBZTWcb6vb4eB7gDmFL")
      .then(async (data) => {
        this.setState({ restaurantListArray: data.restaurantListArray }, () => {
          this.setState({ loading: false });
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  getFeaturedListdata = async () => {
    this.setState({ loading: true });
    await getData("FeaturedList", "RJaee9tJHh30QACsUPd1")
      .then(async (data) => {
        this.setState({ faeturedListArray: data.faeturedListArray }, () => {
          this.setState({ loading: false });
          // console.log("DATA", this.state.faeturedListArray);
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  getFilterData = async () => {
    this.setState({ loading: true });
    const STORAGE_KEY = "@save_age";
    const value = await AsyncStorage.getItem(STORAGE_KEY);

    this.setState({ filter: value });
    this.setState({ loading: false });
    return value;
  };

  // ResturentProvider = () => {
  //   return (
  //     <ResturentListContext.Provider value={this.state.restaurantListArray}>
  //       {this.props.childern}
  //     </ResturentListContext.Provider>
  //   );
  // };
  // ResturentConsumer = () => {
  //   <ResturentListContext.Consumer>
  //     {(value) => {
  //       console.log("Context Data of Resturent Array", value);
  //     }}
  //   </ResturentListContext.Consumer>;
  // };
  // this is a functions to list restauants with this design model
  renderRestaurantListItems = (rowData) => {
    return (
      <TouchableOpacity
        onLongPress={() => {
          this.setState({ visible: true, item: rowData.item });
        }}
        onPress={() =>
          this.props.navigation.navigate("RestaurantDetil", {
            item: rowData.item,
          })
        }
        style={styles.listContainer}
      >
        <Image
          source={{ uri: rowData.item.image }}
          style={styles.image}
        ></Image>

        <View style={styles.likeView}>
          {/* <TouchableOpacity onPress={()=>{this.AddToWishList(rowData.item)}}>
      {rowData.item.liked? (
        <Icon name="heart" family="Entypo" size={18} color={"red"} style={styles.icon} />
      ) : (
        <Icon
          name="heart-outlined"
          family="Entypo"
          size={18}
          color={"red"}
          style={styles.icon}
        />
      )}
      </TouchableOpacity> */}
          <View style={styles.timeView}>
            <Text style={styles.timeText}>{rowData.item.time}</Text>
            <Text style={styles.timeText}>MIN</Text>
            <Text>{rowData.foodType}</Text>
          </View>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.mainText} numberOfLines={1}>
            {rowData.item.name}
          </Text>
          <View style={styles.innerView}>
            <Icon name="star" family="Entypo" size={18} color={"#7be58c"} />
            <Text style={styles.innerText1}>{rowData.item.rating}</Text>
            <Text style={styles.innerText}>({rowData.item.number})</Text>
          </View>
        </View>
        <Text numberOfLines={1} style={styles.text2}>
          $$$,{rowData.item.food}
        </Text>
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>Rs. {rowData.item.price}</Text>
          <Text style={[styles.bottomText, { color: "grey", marginLeft: 10 }]}>
            minimum
          </Text>
        </View>
        <View style={styles.bottomView1}>
          <Text style={styles.bottomText}>Rs. 10</Text>
          <Text style={[styles.bottomText, { color: "grey", marginLeft: 10 }]}>
            {"delivery fee"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={ThemeStyle.pageContainer}>
        <ScrollView>
          {this.state.loading ? (
            <Loading />
          ) : (
            <View>
              <View>
                <Text style={styles.text1}>Your Resturants</Text>

                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={this.props.foodListings.filter(
                    (foodItem) =>
                      foodItem["foodType"] === this.props.filterValue
                  )} // foodListings is array from redux store
                  renderItem={this.renderRestaurantListItems.bind(this)}
                  keyExtractor={(item, index) => index}
                />
              </View>

              <View>
                <Text style={styles.text1}>Featured</Text>

                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={this.props.featuredListings.filter(
                    (foodItem) =>
                      foodItem["foodType"] === this.props.filterValue
                  )}
                  renderItem={this.renderRestaurantListItems.bind(this)}
                  keyExtractor={(item, index) => index}
                />
              </View>

              <View style={{ marginBottom: 20 }}>
                <Text style={styles.text1}>New on TeeChow</Text>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={this.state.newListArray}
                  renderItem={this.renderRestaurantListItems.bind(this)}
                  keyExtractor={(item, index) => index}
                />
              </View>
            </View>
          )}
        </ScrollView>
        <Modal
          transparent
          overlayBackgroundColor={"rgba(0,0,0,.9)"}
          style={{
            flex: 0,
            margin: 0,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            height: "60%",
            top: screenHeight * 0.6,
          }}
          visible={this.state.visible}
          swipeDirection={["up"]}
          width={"100%"}
          animationIn={"slideInUp"}
          animationOut={"slideOutDown"}
          onRequestClose={() => {
            // console.log("gg");
            modalVisible(false);
          }}
        >
          <View style={styles.modal}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                this.setState({ visible: false });
              }}
            >
              <Icon
                name="arrow-down-drop-circle"
                family="MaterialCommunityIcons"
                size={50}
                color={ThemeStyle.tabBarBackgroundColor}
              />
            </TouchableOpacity>

            <View style={styles.bottom}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.AddToWishList();
                }}
              >
                {this.state.modalLoading ? (
                  <ActivityIndicator size={20} color={"#fff"} />
                ) : (
                  <Text style={styles.modaltext1}>Add to Wishlist</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => {
                  this.setState({ visible: false });
                }}
              >
                <Text style={styles.modaltext2}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    foodListings: state.data.foodListings,
    featuredListings: state.featured.featuredListings,
    filterValue: state.filter.value,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getDataListings: (value) => {
      dispatch(getDataListings(value));
    },
    getFeaturedListings: (value) => {
      dispatch(getFeaturedListings(value));
    },
  };
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#fff",
    width: 150,
    elevation: 3,
    marginLeft: 15,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
    //margin:2
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    flexDirection: "row",
    alignSelf: "center",
    // marginTop:40
  },
  image: {
    height: 100,
    width: "100%",
    resizeMode: "cover",
  },
  timeView: {
    height: 40,
    width: 50,
    backgroundColor: "#fff",
    position: "absolute",
    left: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  likeView: {
    position: "absolute",

    flexDirection: "row",
  },
  text1: {
    color: ThemeStyle.foodName,
    fontFamily: "Lato-Bold",
    fontSize: 20,
    margin: 15,
  },
  text: {
    color: "#fff",
    fontFamily: "Lato-Bold",
    fontSize: 13,
  },
  textWrapper: {
    marginTop: 10,
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginHorizontal: 10,
    justifyContent: "space-between",
  },
  mainText: {
    color: "black",
    fontFamily: "Lato-Bold",
    fontSize: 12,
    width: 70,
  },
  innerView: {
    flexDirection: "row",
    alignItems: "center",
  },
  innerText: {
    color: "grey",
    fontFamily: "Lato-Regular",
    fontSize: 10,
  },
  innerText1: {
    color: "black",
    fontFamily: "Lato-Regular",
    fontSize: 10,
  },
  text2: {
    color: "grey",
    fontFamily: "Lato-Regular",
    fontSize: 12,
    marginHorizontal: 10,
    marginTop: 5,
  },
  bottomView: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 5,
  },
  bottomText: {
    color: "black",
    fontFamily: "Lato-Regular",
    fontSize: 12,
  },
  bottomView1: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  timeText: {
    color: "black",
    fontFamily: "Lato-Regular",
    fontSize: 12,
  },
  icon: {
    margin: 10,
  },
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: "100%",
    elevation: 5,
    elevation: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.8,
    height: "25%",
    top: screenHeight * 0.75,
  },

  icon: {
    position: "absolute",
    top: -15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height: 50,
    borderWidth: 0.3,
    width: "90%",
    alignSelf: "center",
    borderColor: "#696969",
    borderRadius: 5,
    padding: 10,
  },
  button: {
    height: 55,
    width: "90%",
    alignSelf: "center",
    backgroundColor: ThemeStyle.tabBarBackgroundColor,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 2,
  },
  button1: {
    height: 55,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: ThemeStyle.foodName,
    borderRadius: 2,
  },
  modaltext1: {
    fontSize: 18,
    fontFamily: "Lato-Bold",
    color: "#fff",
  },
  modaltext2: {
    fontSize: 18,
    fontFamily: "Lato-Bold",
    color: ThemeStyle.foodName,
  },
  bottom: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
