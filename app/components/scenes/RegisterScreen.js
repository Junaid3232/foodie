import React, { useState, useEffect, Component } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  DeviceInfo,
  SafeAreaView,
  AsyncStorage,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { InlineTextInput } from "react-native-stateless-form";
import ThemeStyle from "../../styles/Theme";
import CheckBox from "react-native-check-box";
import Icon from "../../common/icons";
import PhoneInput from "react-native-phone-input";
import { saveData, getData, addToArray, uriToBlob } from "../../utilts/utility";
import { storage } from "../../utilts/firebaseConfig";
import Loading from "./Loading";
import img1 from "../../src/m4.jpeg";
import img2 from "../../src/m5.jpeg";
import img3 from "../../src/m6.jpeg";
import img4 from "../../src/m1.jpeg";
import img5 from "../../src/m3.jpeg";
import img6 from "../../src/m2.jpeg";
import img7 from "../../src/m12.jpeg";
import img8 from "../../src/m13.jpg";
import img9 from "../../src/m14.jpeg";
import img10 from "../../src/m15.jpg";
import img11 from "../../src/m16.png";
import img12 from "../../src/m17.png";
import img13 from "../../src/m18.jpeg";
import img14 from "../../src/m19.jpg";
import img15 from "../../src/m20.jpg";
//sub
import subimg1 from "../../src/m1.jpeg";
import subimg2 from "../../src/m5.jpeg";
import subimg3 from "../../src/m6.jpeg";
import subimg4 from "../../src/m4.jpeg";
import subimg5 from "../../src/m3.jpeg";
import subimg6 from "../../src/m2.jpeg";
import subimg7 from "../../src/m7.jpeg";
import subimg8 from "../../src/m8.jpeg";
import subimg9 from "../../src/m9.jpeg";

import { userSignUp, getCurrentUserId } from "../../utilts/auth";
const fimg1 = Image.resolveAssetSource(img1).uri;
const fimg2 = Image.resolveAssetSource(img2).uri;
const fimg3 = Image.resolveAssetSource(img3).uri;
const fimg4 = Image.resolveAssetSource(img4).uri;
const fimg5 = Image.resolveAssetSource(img5).uri;
const fimg6 = Image.resolveAssetSource(img6).uri;
const fimg7 = Image.resolveAssetSource(img7).uri;
const fimg8 = Image.resolveAssetSource(img8).uri;
const fimg9 = Image.resolveAssetSource(img9).uri;
const fimg10 = Image.resolveAssetSource(img10).uri;
const fimg11 = Image.resolveAssetSource(img11).uri;
const fimg12 = Image.resolveAssetSource(img12).uri;
const fimg13 = Image.resolveAssetSource(img13).uri;
const fimg14 = Image.resolveAssetSource(img14).uri;
const fimg15 = Image.resolveAssetSource(img15).uri;

//sub
const simg1 = Image.resolveAssetSource(subimg1).uri;
const simg2 = Image.resolveAssetSource(subimg2).uri;
const simg3 = Image.resolveAssetSource(subimg3).uri;
const simg4 = Image.resolveAssetSource(subimg4).uri;
const simg5 = Image.resolveAssetSource(subimg5).uri;
const simg6 = Image.resolveAssetSource(subimg6).uri;
const simg7 = Image.resolveAssetSource(subimg7).uri;
const simg8 = Image.resolveAssetSource(subimg8).uri;
const simg9 = Image.resolveAssetSource(subimg9).uri;

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmpassword: "",
      phone: "",
      loading: false,
      passwordError: "",
      emailError: "",
      cpasswordError: "",
      restaurantListArray: null,
      faeturedListArray: null,
      displayName: "",
    };
  }
  onClick() {
    console.log();
  }
  componentDidMount = async () => {
    this.getAllData();
    this.AddData();
  };
  getAllData = async () => {
    await getData("FoodList", "kwBZTWcb6vb4eB7gDmFL")
      .then(async (data) => {
        this.setState({ restaurantListArray: data.restaurantListArray });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  getFeaturedData = async () => {
    await getData("FeaturedList", "RJaee9tJHh30QACsUPd1")
      .then(async (data) => {
        this.setState({ faeturedListArray: data.faeturedListArray });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  AddFeaturedData = async () => {
    let obj = {
      faeturedListArray: [
        {
          rating: "3.9",
          liked: false,
          name: "Ethinic Cuisine",
          foodType: "Mexican",

          miles: "0.3 miles",
          address: "i10/3, Islamabad",
          food: "Mexican Ethinic Cuisine, Ethinic Cuisine, Mexican simple Roll",
          image: fimg12,
          number: 150,
          price: 950,
          time: 15,
          itemArray: [
            {
              itemName: " Discounted Deals",
              subItemArray: [
                {
                  subItemName: " Mexican Ethinic Cuisine",
                  subItemPrice: "200",
                  quantity: 1,
                  description:
                    "Mexican Ethinic Cuisine & regular fries with free soft drink",
                  image: simg1,
                },
                {
                  subItemName: "Mexican Ethinic Cuisine White",
                  subItemPrice: "120",
                  quantity: 1,
                  description:
                    "Mexican Ethinic Cuisine & regular fries with free soft drink",
                  image: simg2,
                },
                {
                  subItemName: "Super Family Deal",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Mexican Ethinic Cuisine, family Size, 2 crunch burger & 8 fried Potatoes with free 1.5 litre soft drink",
                },
              ],
            },
            {
              itemName: "Dainty's Special",
              subItemArray: [
                {
                  subItemName: "Dainty Mexican Ethinic Cuisine",
                  subItemPrice: "500",
                  quantity: 1,
                  description:
                    "Mexican Ethinic Cuisine with onion straws and a pickle slice. Served with fries",
                  image: simg4,
                },
                {
                  subItemName: "Club ",
                  subItemPrice: "700",
                  quantity: 1,
                  description:
                    "Specially marinated Mexican Ethinic Cuisine & served with mushroom sauce",
                  image: simg5,
                },
                {
                  subItemName: "Family Pach",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    " Mexican Ethinic Cuisine with Melted pepper jack cheese, jalapenos, bacon & spicy chili ketchup",
                  image: simg6,
                },
              ],
            },
            {
              itemName: "Steak",
              subItemArray: [
                {
                  subItemName: "Mexican Ethinic Cuisine Tuscany",
                  subItemPrice: "600",
                  quantity: 1,
                  description:
                    "Mexican Ethinic Cuisine with cheese grilled on top & served with pepper sauce",
                  image: simg7,
                },
                {
                  subItemName: "Mexican Ethinic Cuisine with Steak",
                  subItemPrice: "700",
                  quantity: 1,
                  description:
                    "Specially Mexican Ethinic Cuisine & served with mushroom sauce",
                  image: simg8,
                },
                {
                  subItemName: "Mexican Ethinic Cuisine Special",
                  subItemPrice: "1490",
                  quantity: 1,
                  description: "Mexican Ethinic Cuisine with pepper sauce",
                  image: simg8,
                },
              ],
            },
          ],
        },

        {
          rating: "3.3",
          liked: false,
          name: "Mexican Roll ",
          foodType: "Mexican",

          miles: "0.3 miles",
          address: "i10/4 Double Road, Islamabad",
          food: "Mexican Roll, Mexican Vegitable Roll, Mexican simple Roll",
          image: fimg11,
          number: 190,
          price: 230,
          time: 11,
          itemArray: [
            {
              itemName: " Discounted Deals",
              subItemArray: [
                {
                  subItemName: " Mexican Roll",
                  subItemPrice: "200",
                  quantity: 1,
                  description:
                    "Mexican Roll & regular fries with free soft drink",
                  image: simg1,
                },
                {
                  subItemName: "Mexican Roll White",
                  subItemPrice: "120",
                  quantity: 1,
                  description:
                    "Mexican Roll & regular fries with free soft drink",
                  image: simg2,
                },
                {
                  subItemName: "Super Family Deal",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Mexican Roll, family Size, 2 crunch burger & 8 fried Potatoes with free 1.5 litre soft drink",
                },
              ],
            },
            {
              itemName: "Dainty's Special",
              subItemArray: [
                {
                  subItemName: "Dainty Mexican Roll",
                  subItemPrice: "500",
                  quantity: 1,
                  description:
                    "Mexican Roll with onion straws and a pickle slice. Served with fries",
                  image: simg4,
                },
                {
                  subItemName: "Club ",
                  subItemPrice: "700",
                  quantity: 1,
                  description:
                    "Specially marinated Mexican Roll & served with mushroom sauce",
                  image: simg5,
                },
                {
                  subItemName: "Family Pach",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    " Mexican Roll with Melted pepper jack cheese, jalapenos, bacon & spicy chili ketchup",
                  image: simg6,
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
                    "Mexican Roll with cheese grilled on top & served with pepper sauce",
                  image: simg7,
                },
                {
                  subItemName: "Rice Casserole with Steak",
                  subItemPrice: "700",
                  quantity: 1,
                  description:
                    "Specially Mexican Roll & served with mushroom sauce",
                  image: simg8,
                },
                {
                  subItemName: "Mexican Roll Special",
                  subItemPrice: "1490",
                  quantity: 1,
                  description: "Mexican Roll with pepper sauce",
                  image: simg8,
                },
              ],
            },
          ],
        },

        {
          rating: "3.8",
          liked: false,
          name: "Rice Casserole ",
          foodType: "Continental",

          miles: "0.9 miles",
          address: "F9 Markaz",
          food: "Rice Casserole, Special Rice, Extra",
          image: fimg10,
          number: 100,
          price: 200,
          time: 15,
          itemArray: [
            {
              itemName: " Discounted Deals",
              subItemArray: [
                {
                  subItemName: " Continental Rice Casserole",
                  subItemPrice: "200",
                  quantity: 1,
                  description:
                    "Rice Casserole & regular fries with free soft drink",
                  image: simg1,
                },
                {
                  subItemName: "Rice Casserole White",
                  subItemPrice: "1200",
                  quantity: 1,
                  description:
                    "Rice Casserole, piece fried chicken & regular fries with free soft drink",
                  image: simg2,
                },
                {
                  subItemName: "Super Family Deal",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Rice Casserole, family Size, 2 crunch burger & 8 fried Potatoes with free 1.5 litre soft drink",
                },
              ],
            },
            {
              itemName: "Dainty's Special",
              subItemArray: [
                {
                  subItemName: "Dainty Rice Casserole",
                  subItemPrice: "500",
                  quantity: 1,
                  description:
                    "Rice Casseroletopped with onion straws and a pickle slice. Served with fries",
                  image: simg4,
                },
                {
                  subItemName: "Club ",
                  subItemPrice: "700",
                  quantity: 1,
                  description:
                    "Specially marinated Rice Casserole & served with mushroom sauce",
                  image: simg5,
                },
                {
                  subItemName: "Family Pach",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    " Rice Casserole with Melted pepper jack cheese, jalapenos, bacon & spicy chili ketchup",
                  image: simg6,
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
                    "Rice Casserole with cheese grilled on top & served with pepper sauce",
                  image: simg7,
                },
                {
                  subItemName: "Rice Casserole with Steak",
                  subItemPrice: "750",
                  quantity: 1,
                  description:
                    "Specially Rice Casserole & served with mushroom sauce",
                  image: simg8,
                },
                {
                  subItemName: "Rice Casserole Special",
                  subItemPrice: "1490",
                  quantity: 1,
                  description: "Rice Casserole with pepper sauce",
                  image: simg8,
                },
              ],
            },
          ],
        },

        {
          rating: "3.9",
          liked: false,
          name: "Roasted Potatoes ",
          foodType: "Italian",

          miles: "0.9 miles",
          address: "i8 Markaz",
          food: "Roasted, Fried, Extra",
          image: fimg9,
          number: 100,
          price: 200,
          time: 15,
          itemArray: [
            {
              itemName: " Discounted Deals",
              subItemArray: [
                {
                  subItemName: "Roasted Potatoes",
                  subItemPrice: "200",
                  quantity: 1,
                  description:
                    "Crunch Potatoes & regular fries with free soft drink",
                  image: simg1,
                },
                {
                  subItemName: "Potatoes White",
                  subItemPrice: "1200",
                  quantity: 1,
                  description:
                    "White Potatoes, piece fried chicken & regular fries with free soft drink",
                  image: simg2,
                },
                {
                  subItemName: "Super Family Deal",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "High Roasted, family Size, 2 crunch burger & 8 fried Potatoes with free 1.5 litre soft drink",
                },
              ],
            },
            {
              itemName: "Dainty's Special",
              subItemArray: [
                {
                  subItemName: "Dainty Fried Potatoes",
                  subItemPrice: "500",
                  quantity: 1,
                  description:
                    "Fried Potatoes topped with onion straws and a pickle slice. Served with fries",
                  image: simg4,
                },
                {
                  subItemName: "Club ",
                  subItemPrice: "700",
                  quantity: 1,
                  description:
                    "Specially marinated Fried Potatoes & served with mushroom sauce",
                  image: simg5,
                },
                {
                  subItemName: "Family Pach",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    " Potatoes with Melted pepper jack cheese, jalapenos, bacon & spicy chili ketchup",
                  image: simg6,
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
                    "Potatoes fillets with cheese grilled on top & served with pepper sauce",
                  image: simg7,
                },
                {
                  subItemName: "Potatoes Steak",
                  subItemPrice: "750",
                  quantity: 1,
                  description:
                    "Specially marinated Potatoes & served with mushroom sauce",
                  image: simg8,
                },
                {
                  subItemName: "Italian Pepper Steak",
                  subItemPrice: "1490",
                  quantity: 1,
                  description: "Marinated Potatoes pepper sauce",
                  image: simg8,
                },
              ],
            },
          ],
        },

        {
          rating: "3.4",
          liked: false,
          name: "Fish ",
          foodType: "Italian",

          miles: "0.34 miles",
          address: "10,North high way,3rd street",
          food: "Simple, Fried, Extra",
          image: fimg7,
          number: 103,
          price: 500,
          time: 15,
          itemArray: [
            {
              itemName: " Discounted Deals",
              subItemArray: [
                {
                  subItemName: "Fried Fish",
                  subItemPrice: "2000",
                  quantity: 1,
                  description:
                    "Crunch burger or beef burger & regular fries with free soft drink",
                  image: simg1,
                },
                {
                  subItemName: "Fish Karhayi",
                  subItemPrice: "1200",
                  quantity: 1,
                  description:
                    "Crunch burger, piece fried chicken & regular fries with free soft drink",
                  image: simg2,
                },
                {
                  subItemName: "Super Family Deal",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Large pizza, family fries, 2 crunch burger & 8 fried chicken pieces with free 1.5 litre soft drink",
                  image: simg3,
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
                  image: simg4,
                },
                {
                  subItemName: "Club Sandwich",
                  subItemPrice: "700",
                  quantity: 1,
                  description:
                    "A pair of specially marinated boneless chicken & served with mushroom sauce",
                  image: simg5,
                },
                {
                  subItemName: "Big Burger",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Melted pepper jack cheese, jalapenos, bacon & spicy chili ketchup",
                  image: simg6,
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
                  image: simg7,
                },
                {
                  subItemName: "Chicken Steak",
                  subItemPrice: "750",
                  quantity: 1,
                  description:
                    "A pair of specially marinated boneless chicken & served with mushroom sauce",
                  image: simg8,
                },
                {
                  subItemName: "Italian Pepper Steak",
                  subItemPrice: "1490",
                  quantity: 1,
                  description:
                    "Marinated boneless chicken grilled & topped with pepper sauce",
                  image: simg8,
                },
              ],
            },
          ],
        },
        {
          rating: "3",
          liked: false,
          name: "Denty ",
          foodType: "Continental",
          miles: "0.24 miles",
          address: "10,North high way,3rd street",
          food: "Paratha, Roll, Chinese",
          image: fimg1,
          number: 103,
          price: 900,
          time: 12,
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
                  image: simg1,
                },
                {
                  subItemName: "Deal 2",
                  subItemPrice: "1200",
                  quantity: 1,
                  description:
                    "Crunch burger, piece fried chicken & regular fries with free soft drink",
                  image: simg2,
                },
                {
                  subItemName: "Super Family Deal",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Large pizza, family fries, 2 crunch burger & 8 fried chicken pieces with free 1.5 litre soft drink",
                  image: simg3,
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
                  image: simg4,
                },
                {
                  subItemName: "Club Sandwich",
                  subItemPrice: "700",
                  quantity: 1,
                  description:
                    "A pair of specially marinated boneless chicken & served with mushroom sauce",
                  image: simg5,
                },
                {
                  subItemName: "Big Burger",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Melted pepper jack cheese, jalapenos, bacon & spicy chili ketchup",
                  image: simg6,
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
                  image: simg7,
                },
                {
                  subItemName: "Chicken Steak",
                  subItemPrice: "750",
                  quantity: 1,
                  description:
                    "A pair of specially marinated boneless chicken & served with mushroom sauce",
                  image: simg8,
                },
                {
                  subItemName: "Italian Pepper Steak",
                  subItemPrice: "1490",
                  quantity: 1,
                  description:
                    "Marinated boneless chicken grilled & topped with pepper sauce",
                  image: simg8,
                },
              ],
            },
          ],
        },
        {
          rating: "2.5",
          liked: false,
          name: "Hot And Spicy",
          foodType: "Mexican",
          miles: "0.34 miles",
          address: "155,New street, High way Virginia",
          food: "Mutton Karhae",

          image: fimg2,
          number: 180,
          price: 900,
          time: 14,
          itemArray: [
            {
              itemName: "Pizza",
              subItemArray: [
                {
                  subItemName: "Special Pizza",
                  subItemPrice: "2000",
                  quantity: 1,
                  description:
                    "Hawaiian flavor cheese topped pineapple, chicken BBQ, black olives, capsicum & onions",
                  image: "",
                },
                {
                  subItemName: "Chicken Supreme Pizza",
                  subItemPrice: "1200",
                  quantity: 1,
                  description:
                    "Cheese topped sausages, chicken BBQ, black olives, capsicum, onion & mushroom",
                  image: "",
                },
                {
                  subItemName: "Fajita chicken Pizza",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Cheese topped, chicken fajita, capsicum & onion",
                  image: "",
                },
              ],
            },
            {
              itemName: "Sea Food",
              subItemArray: [
                {
                  subItemName: "Fish Finger",
                  subItemPrice: "500",
                  quantity: 1,
                  description:
                    "Fish Finger with onion straws and a pickle slice. Served with fries",
                  image: "",
                },
                {
                  subItemName: "Fish & Fri",
                  subItemPrice: "700",
                  quantity: 1,
                  description:
                    "Specially  marinated boneless Fish & served with mushroom sauce",
                  image: "",
                },
                {
                  subItemName: "Dasi Hot n Spicy",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Prepared with Fish grilled fillet with prime cheddar cheese with hot & BBQ sauce, served with fries",
                  image: "",
                },
              ],
            },
            {
              itemName: "Chinese",
              subItemArray: [
                {
                  subItemName: "Chicken Chowmein",
                  subItemPrice: "600",
                  quantity: 1,
                  description:
                    "Hawaiian flavor cheese topped pineapple, chicken BBQ, black olives, capsicum & onions",
                  image: "",
                },
                {
                  subItemName: "Fried Rice",
                  subItemPrice: "750",
                  quantity: 1,
                  description: "Brown rice with sizlled sauses",
                  image: "",
                },
                {
                  subItemName: "Chicken Fried Rice",
                  subItemPrice: "1490",
                  quantity: 1,
                  description: "Fried chicken with olivies",
                  image: "",
                },
              ],
            },
          ],
        },
        {
          rating: "4.5",
          liked: false,
          name: "Hight way Grill",
          miles: "0.45 miles",
          address: "Southern road,John crew street,New jersy",
          food: "Chicken, Karhae",
          image: fimg3,
          number: 123,
          price: 800,
          time: 16,
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
      ],
    };
    await saveData("FeaturedList", "RJaee9tJHh30QACsUPd1", obj)
      .then((data) => {
        console.log("ADD TO ARRAY", data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  AddData = async () => {
    let obj = {
      restaurantListArray: [
        {
          rating: "3.9",
          liked: false,

          name: "BLT Restaurant",
          foodType: "Mexican",
          miles: "0.34 miles",
          address: "Gol Market, Street 8, F-7/3, Islamabad",
          food: "Chicken,Vegitables, FastFood",
          image: fimg15,
          number: 120,
          price: 300,
          time: 12,
          itemArray: [
            {
              itemName: "Burger",

              subItemArray: [
                {
                  subItemName: "Simple Burger ",
                  subItemPrice: "220",
                  quantity: 1,
                  description: "Top with sauce and cover with the salid.",
                  image: "",
                },
                {
                  subItemName: "Chicken Korma",
                  subItemPrice: "450",
                  quantity: 1,
                  description:
                    "Ranch dressing on the bottom half.Top with salsa, cheese and cover with the second half of the bun.",
                  image: "",
                },
                {
                  subItemName: "Chicken Tandoori",
                  subItemPrice: "800",
                  quantity: 1,
                  description:
                    "To assemble, place the mayonnaise on the heel bun, then shredded iceberg lettuce and the chicken",
                  image: "",
                },
              ],
            },
            {
              itemName: "Pulaoo with Shami Kabab",
              subItemArray: [
                {
                  subItemName: "Pulao with 2 Kabab",
                  subItemPrice: "3000",
                  quantity: 1,
                  description:
                    "Grilled with special sauce, Miracle wip with dip pickle",
                  image: "",
                },
                {
                  subItemName: "Chicken Cheese",
                  subItemPrice: "700",
                  quantity: 1,
                  description: "Adobo sauce, Celery salt, cheese with mayo",
                  image: "",
                },
                {
                  subItemName: "Chicken Masala",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Spicy grilled beef, Mayonnaise on the heel bun,",
                  image: "",
                },
              ],
            },
            {
              itemName: "Chicken with Extra Kabab",
              subItemArray: [
                {
                  subItemName: "Chicken Kabab",
                  subItemPrice: "450",
                  quantity: 1,
                  description: "Chicken, potatos, Lemon juice",
                  image: "",
                },
                {
                  subItemName: "Chicken Keema",
                  subItemPrice: "200",
                  quantity: 1,
                  description: "Keema, Avocado, Cheese with mayo",
                  image: "",
                },
                {
                  subItemName: "Crispy Fried Chicken Burger",
                  subItemPrice: "900",
                  quantity: 1,
                  description:
                    "Panko bread crumbs,Kosher dill pickle, Cider vinegar",
                  image: "",
                },
              ],
            },
          ],
        },
        {
          rating: "3.9",
          liked: false,

          name: "Dinner Club",
          foodType: "Mexican",
          miles: "0.34 miles",
          address: "Blue Area , Islmabad",
          food: "Pulao, Chicken,Kemma, FastFood",
          image: fimg14,
          number: 120,
          price: 300,
          time: 12,
          itemArray: [
            {
              itemName: "Beef Keema",

              subItemArray: [
                {
                  subItemName: "Simple Keema ",
                  subItemPrice: "220",
                  quantity: 1,
                  description: "Top with shami kabab and cover with the salid.",
                  image: "",
                },
                {
                  subItemName: "Chicken Keema",
                  subItemPrice: "450",
                  quantity: 1,
                  description:
                    "Ranch dressing on the bottom half.Top with salsa, cheese and cover with the second half of the bun.",
                  image: "",
                },
                {
                  subItemName: "Chicken Tandoori",
                  subItemPrice: "800",
                  quantity: 1,
                  description:
                    "To assemble, place the mayonnaise on the heel bun, then shredded iceberg lettuce and the chicken",
                  image: "",
                },
              ],
            },
            {
              itemName: "Pulaoo with Shami Kabab",
              subItemArray: [
                {
                  subItemName: "Pulao with 2 Kabab",
                  subItemPrice: "3000",
                  quantity: 1,
                  description:
                    "Grilled with special sauce, Miracle wip with dip pickle",
                  image: "",
                },
                {
                  subItemName: "Chicken Cheese",
                  subItemPrice: "700",
                  quantity: 1,
                  description: "Adobo sauce, Celery salt, cheese with mayo",
                  image: "",
                },
                {
                  subItemName: "Chicken Masala",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Spicy grilled beef, Mayonnaise on the heel bun,",
                  image: "",
                },
              ],
            },
            {
              itemName: "Chicken with Extra Kabab",
              subItemArray: [
                {
                  subItemName: "Chicken Kabab",
                  subItemPrice: "450",
                  quantity: 1,
                  description: "Chicken, potatos, Lemon juice",
                  image: "",
                },
                {
                  subItemName: "Chicken Keema",
                  subItemPrice: "200",
                  quantity: 1,
                  description: "Keema, Avocado, Cheese with mayo",
                  image: "",
                },
                {
                  subItemName: "Crispy Fried Chicken Burger",
                  subItemPrice: "900",
                  quantity: 1,
                  description:
                    "Panko bread crumbs,Kosher dill pickle, Cider vinegar",
                  image: "",
                },
              ],
            },
          ],
        },
        {
          rating: "3.2",
          liked: false,

          name: "Savour Foods",
          foodType: "Continental",
          miles: "0.24 miles",
          address: "Blue Area , Islmabad",
          food: "Pulao, Chicken, FastFood",
          image: fimg13,
          number: 300,
          price: 500,
          time: 10,
          itemArray: [
            {
              itemName: "Chicken Pulao",

              subItemArray: [
                {
                  subItemName: "Chicken Pulao ",
                  subItemPrice: "220",
                  quantity: 1,
                  description: "Top with shami kabab and cover with the salid.",
                  image: "",
                },
                {
                  subItemName: "Chicken Roast",
                  subItemPrice: "450",
                  quantity: 1,
                  description:
                    "Ranch dressing on the bottom half.Top with salsa, cheese and cover with the second half of the bun.",
                  image: "",
                },
                {
                  subItemName: "Chicken Tandoori",
                  subItemPrice: "800",
                  quantity: 1,
                  description:
                    "To assemble, place the mayonnaise on the heel bun, then shredded iceberg lettuce and the chicken",
                  image: "",
                },
              ],
            },
            {
              itemName: "Pulaoo with Shami Kabab",
              subItemArray: [
                {
                  subItemName: "Pulao with 2 Kabab",
                  subItemPrice: "3000",
                  quantity: 1,
                  description:
                    "Grilled with special sauce, Miracle wip with dip pickle",
                  image: "",
                },
                {
                  subItemName: "Chicken Cheese",
                  subItemPrice: "700",
                  quantity: 1,
                  description: "Adobo sauce, Celery salt, cheese with mayo",
                  image: "",
                },
                {
                  subItemName: "Chicken Masala",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Spicy grilled beef, Mayonnaise on the heel bun,",
                  image: "",
                },
              ],
            },
            {
              itemName: "Chicken with Extra Kabab",
              subItemArray: [
                {
                  subItemName: "Chicken Kabab",
                  subItemPrice: "450",
                  quantity: 1,
                  description: "Chicken, potatos, Lemon juice",
                  image: "",
                },
                {
                  subItemName: "Tilapia",
                  subItemPrice: "750",
                  quantity: 1,
                  description: "Tilapia, Avocado, Cheese with mayo",
                  image: "",
                },
                {
                  subItemName: "Crispy Fried Chicken Burger",
                  subItemPrice: "900",
                  quantity: 1,
                  description:
                    "Panko bread crumbs,Kosher dill pickle, Cider vinegar",
                  image: "",
                },
              ],
            },
          ],
        },

        {
          rating: "3.2",
          liked: false,

          name: "3 Star Restaurent",
          foodType: "Italian",
          miles: "0.24 miles",
          address: "10G,North high way,2nd south street,New york",
          food: "Chicken, Tandori Chiken, Saaji",
          image: fimg8,
          number: 303,
          price: 500,
          time: 180,
          itemArray: [
            {
              itemName: "Chicken",

              subItemArray: [
                {
                  subItemName: "Chicken ",
                  subItemPrice: "300",
                  quantity: 1,
                  description: "Top with salsa and cover with the salid.",
                  image: "",
                },
                {
                  subItemName: "Chicken Cheese",
                  subItemPrice: "400",
                  quantity: 1,
                  description:
                    "Ranch dressing on the bottom half.Top with salsa, cheese and cover with the second half of the bun.",
                  image: "",
                },
                {
                  subItemName: "Chicken Tandoori",
                  subItemPrice: "800",
                  quantity: 1,
                  description:
                    "To assemble, place the mayonnaise on the heel bun, then shredded iceberg lettuce and the Zinger chicken",
                  image: "",
                },
              ],
            },
            {
              itemName: "Chicken Fry",
              subItemArray: [
                {
                  subItemName: "Chicken Roast",
                  subItemPrice: "500",
                  quantity: 1,
                  description:
                    "Grilled beef with special sauce, Miracle wip with dip pickle",
                  image: "",
                },
                {
                  subItemName: "Chicken Cheese",
                  subItemPrice: "700",
                  quantity: 1,
                  description: "Adobo sauce, Celery salt, cheese with mayo",
                  image: "",
                },
                {
                  subItemName: "Chicken Masala",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Spicy grilled beef, Mayonnaise on the heel bun,",
                  image: "",
                },
              ],
            },
            {
              itemName: "Chicken Fast",
              subItemArray: [
                {
                  subItemName: "Chicken Korma",
                  subItemPrice: "450",
                  quantity: 1,
                  description: "White fish, potatos, Lemon juice",
                  image: "",
                },
                {
                  subItemName: "Tilapia",
                  subItemPrice: "750",
                  quantity: 1,
                  description: "Tilapia, Avocado, Cheese with mayo",
                  image: "",
                },
                {
                  subItemName: "Crispy Fried Chicken Burger",
                  subItemPrice: "900",
                  quantity: 1,
                  description:
                    "Panko bread crumbs,Kosher dill pickle, Cider vinegar",
                  image: "",
                },
              ],
            },
          ],
        },

        {
          rating: "3.5",
          liked: false,
          name: "Golden Chick",
          foodType: "Italian",
          miles: "0.24 miles",
          address: "10G,North high way,2nd south street,New york",
          food: "Burgers,Pizza,Tandori,Sandwich",
          image: fimg4,
          number: 443,
          price: 200,
          time: 10,
          itemArray: [
            {
              itemName: "Chicken Burger",
              subItemArray: [
                {
                  subItemName: "Chicken Burger",
                  subItemPrice: "300",
                  quantity: 1,
                  description: "Top with salsa and cover with the salid.",
                  image: "",
                },
                {
                  subItemName: "Chicken Cheese Burger",
                  subItemPrice: "400",
                  quantity: 1,
                  description:
                    "Ranch dressing on the bottom half.Top with salsa, cheese and cover with the second half of the bun.",
                  image: "",
                },
                {
                  subItemName: "Chicken Zinger",
                  subItemPrice: "800",
                  quantity: 1,
                  description:
                    "To assemble, place the mayonnaise on the heel bun, then shredded iceberg lettuce and the Zinger chicken",
                  image: "",
                },
              ],
            },
            {
              itemName: "Beef Burger",
              subItemArray: [
                {
                  subItemName: "Beef Hot Burger",
                  subItemPrice: "500",
                  quantity: 1,
                  description:
                    "Grilled beef with special sauce, Miracle wip with dip pickle",
                  image: "",
                },
                {
                  subItemName: "Beef Cheese Burger",
                  subItemPrice: "700",
                  quantity: 1,
                  description: "Adobo sauce, Celery salt, cheese with mayo",
                  image: "",
                },
                {
                  subItemName: "Beef Zinger",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Spicy grilled beef, Mayonnaise on the heel bun,",
                  image: "",
                },
              ],
            },
            {
              itemName: "Fish Burger",
              subItemArray: [
                {
                  subItemName: "Crispy Fish Burger",
                  subItemPrice: "450",
                  quantity: 1,
                  description: "White fish, potatos, Lemon juice",
                  image: "",
                },
                {
                  subItemName: "Tilapia Fish Burger",
                  subItemPrice: "750",
                  quantity: 1,
                  description: "Tilapia, Avocado, Cheese with mayo",
                  image: "",
                },
                {
                  subItemName: "Crispy Fried Fish Burger",
                  subItemPrice: "900",
                  quantity: 1,
                  description:
                    "Panko bread crumbs,Kosher dill pickle, Cider vinegar",
                  image: "",
                },
              ],
            },
          ],
        },

        {
          rating: "4",
          liked: false,
          name: "Famous Dave",
          foodType: "Mexican",
          miles: "0.34 miles",
          address: "55,New street,Virginia",
          food: "Burgers,Pizza,Sandwich",
          image: fimg5,
          number: 300,
          price: 700,
          time: 15,
          itemArray: [
            {
              itemName: "Special pizza",
              subItemArray: [
                {
                  subItemName: "Italian Special Pizza",
                  subItemPrice: "1500",
                  quantity: 1,
                  description: "Top with Cheese, olive, thin dough.",
                  image: simg1,
                },
                {
                  subItemName: "Cheese Special Pizza",
                  subItemPrice: "1200",
                  quantity: 1,
                  description:
                    "Soya sauce,Cheese, Refrigrated pizza crust, Skinless chicken",
                  image: simg2,
                },
                {
                  subItemName: "Crown Special Pizza",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Style pizza sauce, Refrigrated pizza crust, Skinless chicken",
                  image: simg3,
                },
              ],
            },
            {
              itemName: "Pasta",
              subItemArray: [
                {
                  subItemName: "Fusilli Pasta",
                  subItemPrice: "500",
                  quantity: 1,
                  description:
                    "Grilled beef with special sauce, Calamata olives, Red pepper flakes",
                  image: "",
                },
                {
                  subItemName: "Cannelloni Pasta",
                  subItemPrice: "700",
                  quantity: 1,
                  description:
                    "Peno paste, Celery salt,Cheddar cheese with mayo,Tortilla",
                  image: simg4,
                },
                {
                  subItemName: "Linguine Pasta",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Shrim, Pasta, Calamata olives, Red pepper flakes",
                  image: simg5,
                },
              ],
            },
            {
              itemName: "Spaghetti",
              subItemArray: [
                {
                  subItemName: "Cheesy Chicken Spaghetti",
                  subItemPrice: "500",
                  quantity: 1,
                  description: "Vellveta cheese, Rostario, Cream , Poblaino",
                  image: simg6,
                },
                {
                  subItemName: "Tilapia Spaghetti",
                  subItemPrice: "750",
                  quantity: 1,
                  description: "Red wine, Fish sauce, Left over anchovy paste",
                  image: simg7,
                },
                {
                  subItemName: "Italian Sauce Spaghetti",
                  subItemPrice: "490",
                  quantity: 1,
                  description:
                    "Lean ground beef, Tomato sauce, Sweet italian sausages",
                  image: simg8,
                },
              ],
            },
          ],
        },
        {
          rating: "5",
          liked: false,
          name: "Damon's Grill",
          foodType: "Continental",
          miles: "0.45 miles",
          address: "Southern road,John crew street,New jersy",
          food: "Pizza,Tandori,Sandwich",
          image: fimg6,
          number: 55,
          price: 400,
          time: 20,
          itemArray: [
            {
              itemName: "Damon's Famous",
              subItemArray: [
                {
                  subItemName: "Damon's Sampler Platter",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Buffalo hot wings, stuffed potato skins, mozzarella sticks, and onion straws",
                  image: simg1,
                },
                {
                  subItemName: "Damon's Onion loaf",
                  subItemPrice: "1200",
                  quantity: 1,
                  description:
                    "A bubbly hot blend of spicy sausage, creamed cheeses & minced jalapenos. Served with a basket of grilled flatbread",
                  image: simg8,
                },
                {
                  subItemName: "Mozzarella Sticks",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "SLightly breaded mozzarella, fried to a golden brown. Served with rich and thick marinara sauce",
                  image: simg9,
                },
              ],
            },
            {
              itemName: "Burgers",
              subItemArray: [
                {
                  subItemName: "Angus Mini Burgers",
                  subItemPrice: "500",
                  quantity: 1,
                  description:
                    "3 Angus burgers topped with onion straws and a pickle slice. Served with fries",
                  image: simg2,
                },
                {
                  subItemName: "CBBQ Pork Mini Burger",
                  subItemPrice: "700",
                  quantity: 1,
                  description:
                    "3 mini BBQ pork sliders topped with coleslaw. Served with fries",
                  image: simg7,
                },
                {
                  subItemName: "Spicy Baja Burger",
                  subItemPrice: "1000",
                  quantity: 1,
                  description:
                    "Melted pepper jack cheese, jalapenos, bacon & spicy chili ketchup",
                  image: simg3,
                },
              ],
            },
            {
              itemName: "DAMON'S GRILLED MEAT & 3",
              subItemArray: [
                {
                  subItemName: "Chicken Livers",
                  subItemPrice: "2000",
                  quantity: 1,
                  description:
                    "8 ounces of battered & fried chicken livers topped with sauteed onions and chicken gravy",
                  image: simg1,
                },
                {
                  subItemName: "Country Fried Steak",
                  subItemPrice: "750",
                  quantity: 1,
                  description:
                    "Tenderized steak, floured and seasoned with lots of pan style gravy",
                  image: simg5,
                },
                {
                  subItemName: "Italian Sauce Spaghetti",
                  subItemPrice: "1490",
                  quantity: 1,
                  description:
                    "Lean ground beef, Tomato sauce, Sweet italian sausages",
                  image: simg6,
                },
              ],
            },
          ],
        },
      ],
    };
    await saveData("FoodList", "kwBZTWcb6vb4eB7gDmFL", obj)
      .then((data) => {
        console.log("ADD TO ARRAY", data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  ClearUserData = async () => {
    AsyncStorage.setItem("firstTime", "Yes");
    AsyncStorage.setItem("firstTimeDialog", "Yes");
  };
  Signup = async () => {
    this.setState({ loading: true });
    let validation = true;
    const emailsyntax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email == "") {
      validation = false;
      this.setState({ emailError: "Email is required", loading: false });
    } else if (!emailsyntax.test(this.state.email.trim())) {
      validation = false;
      this.setState({
        emailError: "Please enter a valid email",
        loading: false,
      });
    }
    if (this.state.password == "") {
      validation = false;
      this.setState({ passwordError: "Password is required", loading: false });
    }
    if (this.state.confirmpassword == "") {
      validation = false;
      this.setState({
        cpasswordError: "This field is required",
        loading: false,
      });
    } else if (this.state.password != "" && this.state.confirmpassword != "") {
      if (this.state.password != this.state.confirmpassword) {
        validation = false;
        this.setState({
          cpasswordError: "Password miss match",
          loading: false,
        });
      }
    }
    if (validation) {
      this.setState({ loading: true });
      try {
        let obj = {
          email: this.state.email,
          number: this.state.phone,
          displayName: this.state.displayName,
        };
        await userSignUp(this.state.email, this.state.password).then(
          async (user) => {
            if (user) {
              obj.userId = user.user.uid;

              await saveData("Users", obj.userId, obj).then(async () => {
                console.log("success", user);
                let uid = await getCurrentUserId();
                if (
                  this.state.restaurantListArray === undefined ||
                  this.state.restaurantListArray === null
                ) {
                  this.AddData();
                }
                if (
                  this.state.faeturedListArray === undefined ||
                  this.state.faeturedListArray === null
                ) {
                  this.AddFeaturedData();
                }
                console.log(uid);
                AsyncStorage.setItem("userId", uid)
                  .then(() => {
                    this.setState({ loading: false });
                    this.props.navigation.navigate("AppTabNavigator");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              });
            } else {
              this.setState({ loading: false });
            }
          }
        );
      } catch (error) {
        this.setState({ loading: false });
        alert("error");
      }
    }
  };

  render() {
    const { email, password, confirmpassword } = this.state;
    const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    const passwordValid = password && password.length >= 8 ? true : false;
    const confirmpasswordValid =
      confirmpassword && confirmpassword.length >= 8 ? true : false;
    return (
      <View style={ThemeStyle.pageContainer}>
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "transparent",
          }}
        >
          <Image
            source={require("../../src/bgTeeChow.jpg")}
            style={{
              resizeMode: "cover",
              width: null,
              height: Dimensions.get("window").height,
              opacity: 1,
              backgroundColor: "#5b3717",
            }}
          />
        </View>
        <KeyboardAwareScrollView>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 40,
            }}
          >
            <Image
              source={require("../../src/teechowicon.png")}
              style={{ width: 140, height: 120, resizeMode: "contain" }}
            />
            <Image
              source={require("../../src/teechowTextWhite.png")}
              style={{ width: 140, height: 100, resizeMode: "contain" }}
            />
            {/*<Text style={{color:'#fff',textAlign:'center',fontSize:18,paddingVertical:15}}> Foodie </Text>*/}
          </View>

          <View style={styles.container}>
            <InlineTextInput
              label="Name"
              placeholder="Display Name"
              returnKeyType="next"
              onSubmitEditing={() => {
                this.emailTextInput.focus();
              }}
              blurOnSubmit={false}
              placeholderstyle={{ color: "#fff" }}
              autoCorrect={false}
              autoCapitalize="none"
              style={{
                borderColor: "#FFF",
                margin: 20,
                borderRadius: 20,
                borderWidth: 1,
                paddingHorizontal: 15,
                fontFamily: "Lato-Regular",
              }}
              labelStyle={{ color: "#000" }}
              inputStyle={{ color: "#000" }}
              messageStyle={{ color: "red" }}
              icon={<Icon name={"person-outline"} size={18} color={"#000"} />}
              value={this.state.displayName}
              onChangeText={(text) => {
                this.setState({ displayName: text });
              }}
            />

            <InlineTextInput
              label="Email"
              ref={(input) => {
                this.emailTextInput = input;
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.phoneTextInput.focus();
              }}
              blurOnSubmit={false}
              placeholder="Email Address"
              placeholderstyle={{ color: "#fff" }}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              style={{
                borderColor: "#FFF",
                margin: 20,
                borderRadius: 20,
                borderWidth: 1,
                paddingHorizontal: 15,
                fontFamily: "Lato-Regular",
              }}
              labelStyle={{ color: "#000" }}
              inputStyle={{ color: "#000" }}
              messageStyle={{ color: "red" }}
              icon={<Icon name={"mail-outline"} size={18} color={"#000"} />}
              validIcon={<Icon name="check" size={18} color="#ffee00" />}
              invalidIcon={<Icon name="clear" size={18} color="red" />}
              value={email}
              onChangeText={(text) => {
                this.setState({ email: text, emailError: "" });
              }}
              {...this.props}
            />
            {this.state.emailError ? (
              <Text style={styles.text1}>{this.state.emailError}</Text>
            ) : null}
            <View style={styles.phone}>
              <PhoneInput
                style={{ backgroundColor: "#fff" }}
                ref={(input) => {
                  this.phoneTextInput = input;
                }}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.passwordTextInput.focus();
                }}
                blurOnSubmit={false}
                onPressFlag={this.onPressFlag}
                initialCountry="pk"
                textStyle={{
                  textAlign: "center",
                  color: "#000",
                  fontFamily: "Lato-Regular",
                }}
                onChangePhoneNumber={(text) => {
                  this.setState({ phone: text });
                }}
                textProps={{ placeholder: "Enter a phone number" }}
                value={this.state.phone}
              />
            </View>
            <InlineTextInput
              label="Password"
              ref={(input) => {
                this.passwordTextInput = input;
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.confirmTextInput.focus();
              }}
              blurOnSubmit={false}
              placeholder="Password"
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              style={{
                borderColor: "#FFF",
                margin: 20,
                borderRadius: 20,
                borderWidth: 1,
                paddingHorizontal: 15,
                fontFamily: "Lato-Regular",
              }}
              labelStyle={{ color: "#000" }}
              inputStyle={{ color: "#000" }}
              messageStyle={{ color: "red" }}
              icon={
                <Icon name={"add-circle-outline"} size={18} color={"#000"} />
              }
              validIcon={<Icon name="check" size={18} color="#ffee00" />}
              invalidIcon={<Icon name="clear" size={18} color="red" />}
              value={password}
              onChangeText={(text) => {
                this.setState({ password: text, passwordError: "" });
              }}
              {...this.props}
            />
            {this.state.passwordError ? (
              <Text style={styles.text1}>{this.state.passwordError}</Text>
            ) : null}
            <InlineTextInput
              label="Confirm Password"
              ref={(input) => {
                this.confirmTextInput = input;
              }}
              placeholder="Retype Password"
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              style={{
                borderColor: "#FFF",
                margin: 20,
                borderRadius: 20,
                borderWidth: 1,
                paddingHorizontal: 15,
                fontFamily: "Lato-Regular",
              }}
              labelStyle={{ color: "#000" }}
              inputStyle={{ color: "#000" }}
              messageStyle={{ color: "red" }}
              icon={
                <Icon name={"add-circle-outline"} size={18} color={"#000"} />
              }
              validIcon={<Icon name="check" size={18} color="#ffee00" />}
              invalidIcon={<Icon name="clear" size={18} color="red" />}
              value={confirmpassword}
              onChangeText={(text) => {
                this.setState({ confirmpassword: text });
              }}
              {...this.props}
            />
            {this.state.cpasswordError ? (
              <Text style={styles.text1}>{this.state.cpasswordError}</Text>
            ) : null}
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}
          >
            <View
              style={{
                flex: 0.5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckBox
                checkBoxColor={"#FFF"}
                style={{ padding: 10 }}
                onClick={() => this.onClick()}
                isChecked={false}
              />
            </View>
            <View
              style={{
                flex: 3,
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#fff",
                  flexWrap: "wrap",
                  fontFamily: "Lato-Regular",
                }}
              >
                I Agree with terms & condition.
              </Text>
            </View>
          </View>

          <View style={{ paddingVertical: 15 }}>
            <TouchableOpacity
              style={[
                ThemeStyle.buttonColor,
                {
                  marginLeft: 20,
                  marginRight: 20,
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
              onPress={() => {
                this.Signup();
                this.ClearUserData();
              }}
            >
              {this.state.loading ? (
                <Loading />
              ) : (
                <Text style={styles.text}>Create Account</Text>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ paddingVertical: 15 }}
            onPress={() => this.props.navigation.navigate("LoginScreen")}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 16,
                fontFamily: "Lato-Regular",
              }}
            >
              Already have an account ? SIGN IN
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  social: {
    margin: 5,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "grey",
    shadowOffset: { width: -0.3, height: 0 },
    shadowOpacity: 0.3,
    backgroundColor: "transparent",
    elevation: 3,
  },
  text: {
    fontSize: 15,
    fontFamily: "Lato-Bold",
    color: "#fff",
    fontWeight: "bold",
  },
  phone: {
    alignItems: "center",
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    margin: 20,
  },
  text1: {
    fontSize: 15,
    fontFamily: "Lato-Bold",
    color: "red",
    fontWeight: "bold",
    marginLeft: 25,
  },
});
