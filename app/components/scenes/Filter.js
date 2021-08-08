import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  AsyncStorage,
  FlatList,
} from "react-native";
import ThemeStyle from "../../styles/Theme";
import { connect } from "react-redux";
import Icon from "../../common/icons";
import CheckBox from "react-native-check-box";
import { filterAction } from "../../store/actions/action";

import Slider from "react-native-slider";
import { COLORS } from "../../constants/COLORS";
import { array } from "prop-types";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
class Filter extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = () => {};
    this.state = {
      value: 0,
      buttonDisable: false,
      opacityValue: 1,
      // Array for Check boxes
      foodArray: [
        {
          name: "Continental",
          flag: true,
        },
        {
          name: "Italian",
          flag: false,
        },
        {
          name: "Mexican",
          flag: false,
        },
      ],
      locArray: [
        {
          name: "I8",
          flag: true,
        },
        {
          name: "I9",
          flag: false,
        },
        {
          name: "H8",
          flag: false,
        },
      ],
      resArray: [
        {
          name: "Chinese",
          flag: true,
        },
        {
          name: "Italian",
          flag: false,
        },
        {
          name: "Thai",
          flag: false,
        },
      ],
    };
  }

  isChecked = (itemId) => {
    const isThere = this.state.foodArray.includes(itemId);
    return isThere;
  };

  storeData = async (value) => {
    const STORAGE_KEY = "@save_age";
    try {
      await AsyncStorage.setItem(STORAGE_KEY, value).then(() => {});
    } catch (error) {
      console.log("error", error);
    }
  };

  checkValue = () => {
    if (
      this.state.foodArray[0].name === "Continental" &&
      this.state.foodArray[0].flag === true
    ) {
      this.props.filterAction("Continental");
    } else if (
      this.state.foodArray[1].name === "Italian" &&
      this.state.foodArray[1].flag === true
    ) {
      this.props.filterAction("Italian");
    } else if (
      this.state.foodArray[2].name === "Mexican" &&
      this.state.foodArray[2].flag === true
    ) {
      this.props.filterAction("Mexican");
    }
  };
  buttonStatus = () => {
    if (
      this.state.foodArray[0].flag === false &&
      this.state.foodArray[1].flag === false &&
      this.state.foodArray[2].flag === false
    ) {
      this.setState({ buttonDisable: true });
    } else {
      this.setState({ buttonDisable: false });
    }
  };
  uncheckBoxes = () => {};

  render() {
    return (
      <View style={[ThemeStyle.pageContainer]}>
        <ScrollView>
          <Text style={styles.maintext}>{"Food Type"}</Text>
          <View>
            <FlatList
              data={this.state.foodArray}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => (
                <View style={styles.mainView}>
                  <CheckBox
                    checkBoxColor={ThemeStyle.tabBarBackgroundColor}
                    style={{ padding: 10 }}
                    onClick={() => {
                      let array = [...this.state.foodArray];
                      array[index].flag = !array[index].flag;
                      this.setState({ ...this.state, foodArray: array });
                      for (let i = 0; i < this.state.foodArray.length; i++) {
                        if (i != index) {
                          array[i].flag = false;
                        }
                      }

                      this.buttonStatus();
                    }}
                    isChecked={item.flag}
                  />
                  <Text style={styles.text}>{item.name}</Text>
                </View>
              )}
            />
          </View>
          <Text style={styles.maintext}>Select Price</Text>
          <View style={styles.slider}>
            <Slider
              value={this.state.value}
              onValueChange={(value) =>
                this.setState({ value: parseInt(value) })
              }
              maximumValue={100}
              thumbTintColor={ThemeStyle.tabBarBackgroundColor}
              maximumTrackTintColor={"grey"}
              minimumTrackTintColor={ThemeStyle.tabBarBackgroundColor}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                marginTop: 2,
              }}
            >
              <Text style={styles.sliderText}>{"0"}</Text>
              <Text style={styles.sliderText}>{this.state.value}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.maintext}>Restaurant Type</Text>
            <FlatList
              data={this.state.resArray}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => (
                <View style={styles.mainView}>
                  <CheckBox
                    checkBoxColor={ThemeStyle.tabBarBackgroundColor}
                    style={{ padding: 10 }}
                    onClick={() => {
                      let array = [...this.state.resArray];
                      array[index].flag = !array[index].flag;
                      // console.log("g", array[index].flag);
                      this.setState({ ...this.state, resArray: array });
                    }}
                    isChecked={item.flag}
                  />
                  <Text style={styles.text}>{item.name}</Text>
                </View>
              )}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.maintext}>Select Location</Text>
            <FlatList
              data={this.state.locArray}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => (
                <View style={styles.mainView}>
                  <CheckBox
                    checkBoxColor={ThemeStyle.tabBarBackgroundColor}
                    style={{ padding: 10 }}
                    onClick={() => {
                      let array = [...this.state.locArray];
                      array[index].flag = !array[index].flag;
                      // console.log("g", array[index].flag);
                      this.setState({ locArray: array });
                    }}
                    isChecked={item.flag}
                  />
                  <Text style={styles.text}>{item.name}</Text>
                </View>
              )}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={this.state.buttonDisable}
            style={[
              styles.button,
              { opacity: this.state.buttonDisable === true ? 0.4 : 1 },
            ]}
            onPress={() => {
              this.checkValue();
              this.props.navigation.navigate("Restaurant");
            }}
          >
            <Text style={styles.itemtext1}>APPLY FILTER</Text>
          </TouchableOpacity>
        </View>
        {/* )} */}
      </View>
    );
  }
}
//getting checkbox value from redux store
const mapStateToProps = (state) => {
  return {
    value: state.filter.value,
  };
};
//Saving the value of selected checkbox to redux store
const mapDispatchToProps = (dispatch) => {
  return {
    filterAction: (value) => {
      dispatch(filterAction(value));
    },
  };
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: ThemeStyle.tabBarBackgroundColor,
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  itemtext1: {
    fontSize: 15,
    fontFamily: "Lato-Bold",
    color: "#fff",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  container: {
    backgroundColor: "#fff",
    height: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: "100%",
    elevation: 5,
    elevation: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.2,
  },
  text: {
    fontSize: 17,
    fontFamily: "Lato-Bold",
  },
  maintext: {
    fontSize: 18,
    fontFamily: "Lato-Bold",
    marginTop: 20,
    marginLeft: 20,
  },
  sliderText: {
    fontSize: 17,
    fontFamily: "Lato-Regular",
    alignSelf: "center",
    marginTop: -10,
    color: "grey",
  },
  mainView: {
    marginTop: 5,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 7,
    borderRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.8,
    marginBottom: 2,
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    flexDirection: "row",
    alignSelf: "center",
    // marginTop:40
  },
  slider: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    width: "90%",
    alignSelf: "center",
    elevation: 7,
    borderRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.8,
    backgroundColor: "#fff",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
