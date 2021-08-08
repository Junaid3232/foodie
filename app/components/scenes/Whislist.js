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
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import ThemeStyle from "../../styles/Theme";
// import Icon from "../../common/icons";
import StarRating from "react-native-star-rating";
import { COLORS } from "../../constants/COLORS";
import { saveData, getData, addToArray } from "../../utilts/utility";
import Loading from "./Loader";

export default class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
      wishList: [],
      loading: true,
    };
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      (obj) => {
        this.getWisliastData();
      }
    );
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  getWisliastData = async () => {
    this.setState({ loading: true });
    AsyncStorage.getItem("userId").then(async (res) => {
      await getData("Users", res)
        .then(async (data) => {
          this.setState({ wishList: data.WhishList }, () => {
            this.setState({ loading: false });
          });
          console.log("DATA", data.WhishList, this.state.wishList);
        })
        .catch((error) => {
          this.setState({ loading: false });
          console.log("error", error);
        });
    });
  };
  renderItems(rowData) {
    return (
      <View
        style={{
          marginTop: rowData.index === 0 ? 15 : 5,
          margin: 5,
          backgroundColor: "#fff",
          shadowOffset: { width: 0.2, height: 0.2 },
          shadowOpacity: 0.2,
          shadowColor: "black",
          padding: 5,
          elevation: 2,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom: -5,
          }}
        >
          <TouchableOpacity style={{ padding: 5 }}></TouchableOpacity>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            source={{ uri: rowData.item.image }}
            style={{
              height: 110,
              width: "40%",
              borderRadius: 5,
              marginRight: 25,
              marginVertical: 15,
            }}
          />
          <View style={{ width: "60%" }}>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: ThemeStyle.foodName,
                  fontWeight: "bold",
                  paddingVertical: 5,
                  fontFamily: "Lato-Bold",
                }}
              >
                {rowData.item.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                  paddingVertical: 3,
                  fontFamily: "Lato-Regular",
                }}
              >
                {rowData.item.food}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                  fontWeight: "bold",
                  paddingVertical: 3,
                  fontFamily: "Lato-Black",
                }}
              >
                {rowData.item.price}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: "black",
                    paddingVertical: 3,
                    fontFamily: "Lato-Regular",
                  }}
                >
                  Rating :{" "}
                </Text>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  starSize={15}
                  emptyStar={"star-o"}
                  fullStar={"star"}
                  halfStar={"star-half-empty"}
                  iconSet={"FontAwesome"}
                  fullStarColor={"orange"}
                  emptyStarColor={"lightgrey"}
                  rating={rowData.item.rating}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={ThemeStyle.pageContainer}>
        {this.state.loading ? (
          // <ActivityIndicator size={50} color={'red'}  />
          <View style={styles.spinner}>
            <Loading />
          </View>
        ) : (
          <FlatList
            data={this.state.wishList}
            renderItem={this.renderItems.bind(this)}
            keyExtractor={(item, index) => index}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    flexDirection: "row",
    alignSelf: "center",
  },
  spinner: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
