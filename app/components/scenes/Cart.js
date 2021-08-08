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
  Platform,
  TextInput,
  Animated,
  Easing,
  Alert,
  AsyncStorage,
  Linking,
} from "react-native";
import ThemeStyle from "../../styles/Theme";
import Icon from "../../common/icons";
import { COLORS } from "../../constants/COLORS";
import { CreditCardInput } from "react-native-credit-card-input";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import { saveData, getData, addToArray } from "../../utilts/utility";
import StripePayment from "../payment/StripePayment";
import { Stripe_Published_Key, Paypal_Token } from "../../utilts/Config";
import stripe from "tipsi-stripe";
import axios from "axios";
import { WebView } from "react-native-webview";
const screenHeight = Dimensions.get("window").height;
export default class Cart extends Component {
  constructor(props) {
    super(props);
    // if( Platform.OS === 'android' )
    //   {
    //     UIManager.setLayoutAnimationEnabledExperimental(true);
    //   }
    this.state = {
      textLayoutHeight: 0,
      da: "",
      updatedHeight: 0,
      expand: false,
      pr: 0,
      data: "",
      price: 0,
      sp: 0,
      name: "",
      buttonText: "Click Here To Expand",
      image: require("../../src/up-arrow.png"),
      starCount: 3.5,
      number: 0,
      orderFlag: false,
      paymentFlag: false,
      personalFlag: false,
      addressFlag: false,
      linksFlag: false,
      noteFlag: false,
      voucherFlag: false,
      animatedValue: new Animated.Value(0),
      fadeAnimation: new Animated.Value(0),
      orderArray: [],
      subTotal: 0,
      paymentMethod: "",
      newListArray: [
        {
          id: 1,
          name: "Zabardast Deal 1",
          price: "610.00",
        },
      ],
    };
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      async (obj) => {
        const Order = await AsyncStorage.getItem("Order");
        let OrderArray = JSON.parse(Order);
        this.setState({ orderArray: OrderArray });
        let array = this.state.orderArray;
        let subtotal = 0;
        array.map((i) => {
          subtotal = parseInt(i.subItemPrice) + parseInt(subtotal);
          this.setState({ sp: i.subItemPrice });
        });

        this.setState({ subTotal: subtotal });
        console.log("orders", OrderArray);
      }
    );
  }
  onSelect(index, value) {
    this.setState({ index: index, value: value });
    if (value == "item1") {
      this.setState({ paymentMethod: "cash" });
    } else if (value == "item2") {
      this.setState({ paymentMethod: "credit card" });
      this.Payment();
    } else if (value == "item3") {
      this.PaypalPayemnt();
    }
  }
  getHeight(height) {
    this.setState({ textLayoutHeight: height });
  }
  Payment = async () => {
    let init = stripe.setOptions({
      publishableKey: Stripe_Published_Key,
    });

    const token = await stripe.paymentRequestWithCardForm({
      smsAutofillDisabled: true,
      requiredBillingAddressFields: "full",
      prefilledInformation: {
        billingAddress: {
          name: "Enappd Store",
          line1: "Canary Place",
          line2: "3",
          city: "Macon",
          state: "",
          country: "Estonia",
          postalCode: "31217",
          email: "admin@enappd.com",
        },
      },
    });

    await fetch(
      "http://localhost:5000/shoppr-c97a7/us-central1/payWithStripe",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 100,
          currency: "usd",
          token: token.tokenId,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        alert("success");
        // this.setState({
        //   success: responseJson.status == 'succeeded' ? true : false,
        //   response: responseJson
        // })
      })
      .catch((error) => {
        console.error(error);
      });

    console.log("TOKEN", token);
  };
  componentDidMount = async () => {};
  add = async (index) => {
    const Order = await AsyncStorage.getItem("Order");
    let arr = JSON.parse(Order);
    let array = this.state.orderArray;
    array[index].quantity = array[index].quantity + 1;
    console.log("QUANTITY", array[index].quantity);
    // array[index].subItemPrice = array[index].quantity * arr[index].subItemPrice;
    this.setState({
      orderArray: array,
      subTotal:
        parseInt(this.state.subTotal) + parseInt(arr[index].subItemPrice),
    });
    // await AsyncStorage.removeItem("Order");
    //   await AsyncStorage.setItem(
    //     "Order",
    //     JSON.stringify(this.state.orderArray)
    //   );
  };

  ///////// PayPal integration ////////
  PaypalPayemnt = () => {
    let currency = "100 USD";
    currency.replace(" USD", "");
    const dataDetail = JSON.stringify({
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:3000/process",
        cancel_url: "http://localhost:3000/cancel",
      },
      transactions: [
        {
          amount: {
            total: "10",
            currency: "USD",
          },
          description: "This is the payment transaction description.",
        },
      ],
    });

    // axios
    //   .post(
    //     "https://api.sandbox.paypal.com/v1/oauth2/token",
    //     { grant_type: "client_credentials" },
    //     {
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         Authorization: Paypal_Token, // Your authorization value
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     this.setState({
    //       accessToken: response.data.access_token,
    //     });
    axios
      .post("https://api.sandbox.paypal.com/v1/payments/payment", dataDetail, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer A21AALkBntOo6_-T7VhxJ1fog02fRcqdIcWe4aIH6HkogQhEAWJGMCMBNdVw8g--T2a8OgNAC5nC1oVuw1a2WZSFkdNjzuH1g`,
        },
      })
      .then((response) => {
        console.log("RESPONSE", response);
        const { id, links } = response.data;
        const approvalUrl = links.find((data) => data.rel == "approval_url");

        this.setState({
          paymentId: id,
          approvalUrl: approvalUrl.href,
        });
        console.log("APPROVALURL", approvalUrl.href);
        if (approvalUrl.href !== null) {
          Linking.openURL(approvalUrl.href);
        }
      })
      .catch((err) => {
        console.log("ERRROR", { ...err });
      });
    // })
    // .catch((err) => {
    //   console.log({ ...err });
    // });
  };

  _onNavigationStateChange = (webViewState) => {
    if (webViewState.url.includes("https://example.com/")) {
      this.setState({
        approvalUrl: null,
      });

      const { PayerID, paymentId } = webViewState.url;

      axios
        .post(
          `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
          { payer_id: PayerID },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.state.accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log({ ...err });
        });
    }
  };

  delete = async (index) => {
    const Order = await AsyncStorage.getItem("Order");
    let arr = JSON.parse(Order);
    let array = this.state.orderArray;
    array[index].quantity = array[index].quantity - 1;
    console.log("QUANTITY", array[index].quantity);
    // array[index].subItemPrice =
    //   parseInt(array[index].quantity) * parseInt(arr[index].subItemPrice);
    this.setState({
      orderArray: array,
      subTotal:
        parseInt(this.state.subTotal) - parseInt(arr[index].subItemPrice),
    });
    if (array[index].quantity === 0) {
      array.splice(index, 1);
      this.setState({ orderArray: array });
      await AsyncStorage.removeItem("Order");
      await AsyncStorage.setItem(
        "Order",
        JSON.stringify(this.state.orderArray)
      );
    }
  };
  PlaceOrder = async () => {
    let id = 0;
    AsyncStorage.getItem("userId").then(async (res) => {
      let obj = {
        total: parseInt(this.state.subTotal) + 30,
        subtotal: this.state.subTotal,
        voucher_number: 0,
        address: this.state.address,
        note: this.state.note,
        order: this.state.orderArray,
        paymentMethod: this.state.paymentMethod,
        id: res,
      };

      await addToArray("Orders", "EvQP0bPrez7TlL4T14Vx", "Orders", obj)
        .then(async (data) => {
          await AsyncStorage.removeItem("Order").then(() => {
            console.log("OrderPlaced", data);
            Alert.alert("Are you sure to order?", "", [
              {
                text: "NO",
                onPress: () => {
                  this.props.navigation.navigate("Cart");
                },
              },
              { text: "YES", onPress: () => alert("Order Placed Succesfully") },
            ]);
          });
          this.props.navigation.navigate("Restaurant");
        })
        .catch((error) => {
          console.log("error", error);
          alert("error");
        });
    });
  };
  animate() {
    this.setState({ orderFlag: !this.state.orderFlag });
    this.state.animatedValue.setValue(0);
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
    }).start(() => this.animate1());
  }
  animate1() {
    this.state.animatedValue.setValue(0);
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
    }).stop(() => this.animate());
  }
  fadeIn = () => {
    this.setState({ orderFlag: !this.state.orderFlag });
    Animated.timing(this.state.fadeAnimation, {
      toValue: 1,
      duration: 1000,
    }).start(() => {
      console.log("gggwhgh");
    });
  };

  fadeOut = () => {
    alert("gggg");
    Animated.timing(this.state.fadeAnimation, {
      toValue: 0,
      duration: 4000,
    }).start();
  };

  render() {
    const rotateX = this.state.animatedValue.interpolate({
      inputRange: [0, 0.1, 1],
      outputRange: ["0deg", "50deg", "0deg"],
    });

    return (
      <View
        style={[
          ThemeStyle.pageContainer,
          // {...ifIphoneX({marginTop: 30})}
        ]}
      >
        <ScrollView>
          <View style={styles.topCard}>
            {!this.state.orderArray ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 20,
                }}
              >
                <Text style={styles.nameText}>No item in cart</Text>
              </View>
            ) : (
              <FlatList
                data={this.state.orderArray}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {
                  console.log("index", index);
                  return (
                    <View style={styles.orderCard}>
                      <View style={styles.quantityView}>
                        <TouchableOpacity
                          onPress={() => {
                            this.delete(index);
                          }}
                        >
                          <Icon
                            name="minus"
                            family="Feather"
                            size={20}
                            color={ThemeStyle.tabBarBackgroundColor}
                          />
                        </TouchableOpacity>
                        <Text style={styles.numberText}>{item.quantity}</Text>

                        <TouchableOpacity
                          onPress={() => {
                            this.add(index);
                          }}
                        >
                          <Icon
                            name="plus"
                            family="Feather"
                            size={20}
                            color={ThemeStyle.tabBarBackgroundColor}
                          />
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.nameText}>{item.subItemName}</Text>
                      <Text style={styles.priceText}>
                        Rs.{" "}
                        {parseInt(item.subItemPrice) * parseInt(item.quantity)}
                      </Text>
                    </View>
                  );
                }}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.sumaryCard}
            onPress={() => {
              this.fadeIn();
            }}
          >
            <View
              style={[
                styles.sumaryCard1,
                { marginBottom: this.state.orderFlag ? 10 : 0 },
              ]}
            >
              <Text style={styles.summaryText}>{"Order Info"}</Text>
              <TouchableOpacity
                onPress={() => {
                  this.fadeIn();
                }}
              >
                <Icon
                  name={this.state.orderFlag ? "arrow-up" : "arrow-down"}
                  family="SimpleLineIcons"
                  size={15}
                  color={ThemeStyle.tabBarBackgroundColor}
                />
              </TouchableOpacity>
            </View>
            {this.state.orderFlag ? (
              <Animated.View
                style={[styles.sumaryinnerCard, { transform: [{ rotateX }] }]}
              >
                <View style={styles.totalView}>
                  <Text style={styles.totalText}>Subtotal</Text>
                  <Text style={styles.total}>Rs. {this.state.subTotal}.00</Text>
                </View>
                <View style={styles.totalView}>
                  <Text style={styles.totalText}>Delivery fee</Text>
                  <Text style={styles.total}>Rs. 30.00</Text>
                </View>
                <View style={styles.totalView}>
                  <Text style={styles.totalText}>Discount</Text>
                  <Text style={styles.total}>Rs. 0</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ voucherFlag: !this.state.voucherFlag });
                  }}
                >
                  <Text
                    style={[
                      styles.summaryText,
                      { color: ThemeStyle.tabBarBackgroundColor },
                    ]}
                  >
                    {"Do you have a voucher?"}
                  </Text>
                </TouchableOpacity>
                {this.state.voucherFlag ? (
                  <View>
                    <Text style={styles.v2}>Add Your Voucher</Text>
                    <View style={styles.bottom}>
                      <TextInput
                        style={styles.textInput1}
                        value={this.state.voucherNumber}
                        onChangeText={(text) => {
                          this.setState({ voucherNumber: text });
                        }}
                      />

                      <TouchableOpacity style={styles.button1}>
                        <Text style={styles.v1}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
                <View style={styles.border}></View>
                <View style={[styles.totalView, { marginTop: 10 }]}>
                  <Text style={styles.totalText1}>Total</Text>
                  {this.state.subTotal == 0 ? (
                    <Text style={styles.total1}>Rs. 0</Text>
                  ) : (
                    <Text style={styles.total1}>
                      Rs. {parseInt(this.state.subTotal) + parseInt(30)}.00
                    </Text>
                  )}
                </View>
              </Animated.View>
            ) : null}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sumaryCard}
            onPress={() => {
              this.setState({ personalFlag: !this.state.personalFlag });
            }}
          >
            <View style={styles.sumaryCard1}>
              <Text style={styles.summaryText}>{"Contact Info"}</Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ personalFlag: !this.state.personalFlag });
                }}
              >
                <Icon
                  name={this.state.personalFlag ? "arrow-up" : "arrow-down"}
                  family="SimpleLineIcons"
                  size={15}
                  color={ThemeStyle.tabBarBackgroundColor}
                />
              </TouchableOpacity>
            </View>
            {this.state.personalFlag ? (
              <View>
                <View style={styles.iconView}>
                  <Text style={styles.contactText}>Delivery details: Home</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ addressFlag: !this.state.addressFlag });
                    }}
                  >
                    <Icon
                      name={"pencil"}
                      family="SimpleLineIcons"
                      size={15}
                      color={ThemeStyle.tabBarBackgroundColor}
                    />
                  </TouchableOpacity>
                </View>
                {this.state.addressFlag ? (
                  <TextInput
                    value={this.state.address}
                    onChangeText={(text) => {
                      this.setState({ address: text });
                    }}
                    style={styles.textinput}
                    placeholder={"Address"}
                  />
                ) : null}
                <View style={styles.iconView}>
                  <Text style={styles.contactText1}>
                    Property Links: Islamabad
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ linksFlag: !this.state.linksFlag });
                    }}
                  >
                    <Icon
                      name={"pencil"}
                      family="SimpleLineIcons"
                      size={15}
                      color={ThemeStyle.tabBarBackgroundColor}
                    />
                  </TouchableOpacity>
                </View>
                {this.state.linksFlag ? (
                  <TextInput style={styles.textinput} />
                ) : null}
                <View style={styles.iconView}>
                  <Text style={styles.contactText1}>Note to rider: None</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ noteFlag: !this.state.noteFlag });
                    }}
                  >
                    <Icon
                      name={"pencil"}
                      family="SimpleLineIcons"
                      size={15}
                      color={ThemeStyle.tabBarBackgroundColor}
                    />
                  </TouchableOpacity>
                </View>
                {this.state.noteFlag ? (
                  <TextInput
                    style={styles.textinput1}
                    value={this.state.note}
                    onChangeText={(text) => {
                      this.setState({ note: text });
                    }}
                    placeholder={"note (optional)"}
                  />
                ) : null}
                <View style={styles.border}></View>
                <View style={[styles.totalView, { marginTop: 10 }]}>
                  <Text style={styles.summaryText}>{"Delivery time"}</Text>
                  <Text style={styles.text1}>{"NOW (20 min)"}</Text>
                </View>
              </View>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sumaryCard}
            onPress={() => {
              this.setState({ paymentFlag: !this.state.paymentFlag });
            }}
          >
            <View style={styles.sumaryCard1}>
              <Text style={styles.summaryText}>{"Payment Method"}</Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ paymentFlag: !this.state.paymentFlag });
                }}
              >
                <Icon
                  name={this.state.paymentFlag ? "arrow-up" : "arrow-down"}
                  family="SimpleLineIcons"
                  size={15}
                  color={ThemeStyle.tabBarBackgroundColor}
                />
              </TouchableOpacity>
            </View>
            {this.state.paymentFlag ? (
              <View style={styles.cardView}>
                <RadioGroup
                  size={20}
                  thickness={2}
                  color={ThemeStyle.tabBarBackgroundColor}
                  // highlightColor='#ccc8b9'
                  // selectedIndex={1}
                  onSelect={(index, value) => this.onSelect(index, value)}
                >
                  <RadioButton value={"item1"}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.text}>COD(Cash On Delivery)</Text>
                      <View
                        style={{
                          marginLeft: screenHeight > 667 ? 130 : 60,
                          marginTop: -5,
                        }}
                      >
                        <Icon
                          name="cash"
                          family="MaterialCommunityIcons"
                          size={28}
                          color={"#696969"}
                        />
                      </View>
                    </View>
                  </RadioButton>

                  <RadioButton value={"item2"}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.text}>CREDIT CARD</Text>
                      <View
                        style={{
                          marginLeft: screenHeight > 667 ? 160 : 90,
                          marginTop: -5,
                          flexDirection: "row",
                        }}
                      >
                        <Image
                          source={require("../../src/mastercard.png")}
                          style={styles.image}
                        />
                        <Image
                          source={require("../../src/visa.png")}
                          style={[styles.image, { marginLeft: 10 }]}
                        />
                      </View>
                    </View>
                  </RadioButton>
                  <RadioButton value={"item3"}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.text}>PayPal</Text>
                      <View
                        style={{
                          marginLeft: screenHeight > 667 ? 235 : 165,
                          marginTop: -5,
                        }}
                      >
                        <Icon
                          name="cash"
                          family="MaterialCommunityIcons"
                          size={28}
                          color={"#696969"}
                        />
                      </View>
                    </View>
                  </RadioButton>
                </RadioGroup>
                {/* {this.state.approvalUrl!=null ? ( */}
                <WebView
                  source={{ uri: "https://www.google.com" }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  injectedJavaScript={this.state.cookie}
                  startInLoadingState={false}
                  style={{ marginTop: 20 }}
                />
                {/* ) : null}  */}
                {/* {this.state.index == 1 ? (
                  <View style={styles.container}>
                    <CreditCardInput
                      autoFocus
                      requiresName
                      requiresCVC
                      requiresPostalCode
                      labelStyle={styles.label}
                      inputStyle={styles.input}
                      validColor={"#E6A422"}
                      invalidColor={"red"}
                      placeholderColor={"darkgray"}
                      onFocus={this._onFocus}
                      onChange={this._onChange}
                    />
                  </View>
                ) : null} */}
              </View>
            ) : null}
          </TouchableOpacity>
          <View style={styles.textView}>
            <Text style={styles.agreeText}>
              {"By completng this order, I agree to all Terms & Condition"}
            </Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.agreeText1}>
              {
                "I agree and demand that you execute the order service before the end of revocation period. I am aware that after complete fulfillment of service i lose my right of rescission"
              }
            </Text>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.PlaceOrder();
            }}
          >
            <View style={styles.item}>
              {!this.state.orderArray ? (
                <Text style={styles.itemtext}>0</Text>
              ) : (
                <Text style={styles.itemtext}>
                  {this.state.orderArray?.length}
                </Text>
              )}
            </View>
            <Text style={styles.itemtext1}>PLACE ORDER</Text>
            {/* {this.state.number == 0 ? (
              <Text style={styles.total1}>Rs. {this.state.price}</Text>
            ) : ( */}
            {this.state.subTotal === 0 ? (
              <Text style={styles.itemtext1}>RS. 0</Text>
            ) : (
              <Text style={styles.itemtext1}>
                RS. {parseInt(this.state.subTotal) + parseInt(30)}
              </Text>
            )}

            {/* )} */}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    flexDirection: "row",
    alignSelf: "center",
    // marginTop:40
  },
  ChildView: {
    borderWidth: 1,
    borderColor: "#00BCD4",
    margin: 5,
  },
  TouchableOpacityStyle: {
    // padding: 10,
    // backgroundColor: '#00BCD4'
  },
  TouchableOpacityTitleText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
  ExpandViewInsideText: {
    height: 200,
    width: null,
  },
  SummaryListText: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    color: "#3d3d3d",
    paddingVertical: 3,
  },
  topCard: {
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingBottom: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.2,
  },
  orderCard: {
    // height: 200,
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  quantityView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 90,
    alignItems: "center",
  },

  numberText: {
    fontSize: 13,
    fontFamily: "Lato-Regular",
    textAlign: "center",
  },
  nameText: {
    fontSize: 14,
    fontFamily: "Lato-Bold",
    color: "#696969",
  },
  priceText: {
    fontSize: 13,
    fontFamily: "Lato-Regular",
  },
  sumaryCard: {
    padding: 20,
    width: "90%",
    backgroundColor: "#fff",
    marginTop: 10,
    alignSelf: "center",
    borderRadius: 5,
    // flexDirection: "row",
    justifyContent: "space-between",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.2,
  },
  sumaryCard1: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryText: {
    fontSize: 14,
    fontFamily: "Lato-Regular",
  },
  sumaryinnerCard: {
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 10,
    justifyContent: "space-between",
  },
  totalView: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
  },
  totalText: {
    fontSize: 14,
    fontFamily: "Lato-Regular",
    color: "#696969",
  },
  total: {
    fontSize: 13,
    fontFamily: "Lato-Regular",
  },
  border: {
    height: 0.3,
    backgroundColor: "lightgrey",
    width: "100%",
    marginVertical: 10,
  },
  totalText1: {
    fontSize: 15,
    fontFamily: "Lato-Bold",
  },
  total1: {
    fontSize: 14,
    fontFamily: "Lato-Bold",
  },
  contactText: {
    fontSize: 14,
    fontFamily: "Lato-Regular",
    marginTop: 20,
  },
  contactText1: {
    fontSize: 14,
    fontFamily: "Lato-Regular",
    color: "#696969",
    marginTop: 10,
  },
  text1: {
    fontSize: 14,
    fontFamily: "Lato-Regular",
    color: "#696969",
  },
  text: {
    fontSize: 14,
    fontFamily: "Lato-Regular",
  },
  cardView: {
    marginTop: 10,
  },
  image: {
    height: 20,
    width: 22,
  },
  textinput: {
    height: 35,
    width: "100%",
    padding: 5,
    borderWidth: 0.3,
    borderColor: "#696969",
    marginVertical: 10,
    color: "black",
    fontFamily: "Lato-Regular",
    borderRadius: 5,
  },
  textinput1: {
    height: 50,
    width: "100%",
    padding: 5,
    borderWidth: 0.3,
    borderColor: "#696969",
    marginVertical: 10,
    color: "black",
    fontFamily: "Lato-Regular",
    borderRadius: 5,
  },
  iconView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  agreeText: {
    fontSize: 15,
    fontFamily: "Lato-Regular",
    color: "#696969",
  },
  agreeText1: {
    fontSize: 13,
    fontFamily: "Lato-Bold",
    color: "#565656",
  },
  textView: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  footer: {
    width: "100%",
    // elevation: 7,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    height: 50,
    backgroundColor: ThemeStyle.tabBarBackgroundColor,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  item: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  itemtext: {
    fontSize: 10,
    fontFamily: "Lato-Bold",
    color: ThemeStyle.tabBarBackgroundColor,
  },
  itemtext1: {
    fontSize: 15,
    fontFamily: "Lato-Bold",
    color: "#fff",
  },
  button1: {
    height: 50,
    width: "100%",
    alignSelf: "center",
    backgroundColor: ThemeStyle.tabBarBackgroundColor,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  v1: {
    fontSize: 18,
    fontFamily: "Lato-Bold",
    color: "#fff",
  },
  v2: {
    fontSize: 14,
    fontFamily: "Lato-Regular",
    // marginLeft: 20,
    marginTop: 12,
  },
  bottom: {
    width: "100%",
    // height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput1: {
    marginTop: 10,
    height: 40,
    borderWidth: 0.3,
    width: "100%",
    alignSelf: "center",
    borderColor: "#696969",
    borderRadius: 5,
    padding: 10,
  },
});
