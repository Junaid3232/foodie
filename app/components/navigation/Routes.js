import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Icon from "../../common/icons";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "../scenes/LoginScreen";
import RegisterScreen from "../scenes/RegisterScreen";
import Restaurant from "../scenes/Restaurant";

import Search from "../scenes/Search";
import Account from "../scenes/Account";
import Whishlist from "../scenes/Whislist";
import Cart from "../scenes/Cart";
import SpecialCoupans from "../scenes/SpecialCoupans";
import Filter from "../scenes/Filter";
import RestaurantDetil from "../scenes/ResturantDetail";
import Profile from "../scenes/Profile";
import MyOrders from "../scenes/MyOrders";
import BillingAddress from "../scenes/BillingAddress";
import inviteFriends from "../scenes/InviteFriends";
import AuthLoading from "../scenes/AuthLoading";
import ForgotPassword from "../scenes/ForgotPassword";
import ChatRoom from "../scenes/ChatRoom";
import Messages from "../scenes/Messages";
console.disableYellowBox = true;
const iconActiveTintColor = "#7be58c";
const iconInActiveTintColor = "#FFF";
const AuthStack = createStackNavigator(
  {
    AuthLoading: AuthLoading,
    LoginScreen: LoginScreen,
    RegisterScreen: RegisterScreen,
    ForgotPassword: ForgotPassword,
  },
  {
    defaultNavigationOptions: {
      header: null,
      showLabel: false,
    },
  }
);
const ProfilStack = createStackNavigator(
  {
    Account: Account,
    Profile: Profile,
    MyOrders: MyOrders,
    BillingAddress: BillingAddress,
    inviteFriends: inviteFriends,
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
      },
    },
  }
);
const chatStack = createStackNavigator({
  Room: {
    screen: ChatRoom,
    navigationOptions: ({ navigation }) => ({
      title: "Chat",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 5,
      },
      headerTitleStyle: { color: "#fff", fontFamily: "Lato-Bold" },
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate("Restaurant")}
          style={{ marginLeft: 20 }}
        >
          <Icon name="arrow-left" family="Feather" size={20} color={"#fff"} />
        </TouchableOpacity>
      ),
    }),
  },
  Messages: {
    screen: Messages,
    navigationOptions: {
      title: "Messages",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
      },
      headerTitleStyle: { color: "#fff", fontFamily: "Lato-Bold" },
    },
  },
});
const homeStack = createStackNavigator({
  Restaurant: {
    screen: Restaurant,

    navigationOptions: ({ navigation }) => ({
      title: "Home",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
        alignItems: "center",
        justifyContent: "space-between",
        // paddingHorizontal: 20,
      },
      headerTitleStyle: { color: "#fff", fontFamily: "Lato-Bold" },
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          style={{ marginLeft: 20 }}
        >
          <Icon name="search" family="Feather" size={20} color={"#fff"} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate("Account")}
          style={{ marginRight: 20 }}
        >
          <Icon name="user" family="Feather" size={20} color={"#fff"} />
        </TouchableOpacity>
      ),
    }),
  },
  RestaurantDetil: {
    screen: RestaurantDetil,
    navigationOptions: {
      headerTransparent: true,
      title: "",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
      },
      headerTitleStyle: { color: "#fff", fontFamily: "Lato-Bold" },
    },
  },
  Search: {
    screen: Search,
    navigationOptions: {
      title: "Search",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
      },
      headerTitleStyle: { color: "#fff", fontFamily: "Lato-Bold" },
    },
  },
  Account: {
    screen: ProfilStack,
    navigationOptions: {
      title: "Account",
      header: null,
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
      },
      headerTitleStyle: { color: "#fff", fontFamily: "Lato-Bold" },
    },
  },
  Carti: {
    screen: Cart,
    navigationOptions: {
      title: "Cart",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
      },
      headerTitleStyle: { color: "#fff", fontFamily: "Lato-Bold" },
    },
  },
});
const whishlistStack = createStackNavigator({
  Whishlist: {
    screen: Whishlist,
    navigationOptions: ({ navigation }) => ({
      title: "Whislist",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
        alignItems: "center",
        justifyContent: "space-between",
        // paddingHorizontal: 20,
      },
      headerTitleStyle: { color: "#fff", fontFamily: "Lato-Bold" },
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate("wishSearch")}
          style={{ marginLeft: 20 }}
        >
          <Icon name="search" family="Feather" size={20} color={"#fff"} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate("wishAccount")}
          style={{ marginRight: 20 }}
        >
          <Icon name="user" family="Feather" size={20} color={"#fff"} />
        </TouchableOpacity>
      ),
    }),
  },
  wishSearch: {
    screen: Search,
    navigationOptions: {
      title: "Search",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
      },
      headerTitleStyle: { color: "#fff", fontFamily: "Lato-Bold" },
    },
  },
  wishAccount: {
    screen: Account,
    navigationOptions: {
      title: "Account",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
      },
      headerTitleStyle: { color: "#fff", fontFamily: "Lato-Bold" },
    },
  },
});

const cartStack = createStackNavigator({
  Cart: {
    screen: Cart,
    navigationOptions: ({ navigation }) => ({
      title: "Cart",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
        alignItems: "center",
        justifyContent: "space-between",
        // paddingHorizontal: 20,
      },
      headerTitleStyle: {
        color: "#fff",
        // fontFamily: "Lato-Bold"
      },
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate("cartSearch")}
          style={{ marginLeft: 20 }}
        >
          <Icon name="search" family="Feather" size={20} color={"#fff"} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate("cartAccount")}
          style={{ marginRight: 20 }}
        >
          <Icon name="user" family="Feather" size={20} color={"#fff"} />
        </TouchableOpacity>
      ),
    }),
  },
  cartSearch: {
    screen: Search,
    navigationOptions: {
      title: "Search",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
      },
      headerTitleStyle: { color: "#fff", fontFamily: "Lato-Bold" },
    },
  },
  cartAccount: {
    screen: Account,
    navigationOptions: {
      title: "Account",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
      },
      headerTitleStyle: { color: "#fff", fontFamily: "Lato-Bold" },
    },
  },
});
const coupansStack = createStackNavigator({
  SpecialCoupans: {
    screen: SpecialCoupans,
    navigationOptions: ({ navigation }) => ({
      title: "Chat",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
        alignItems: "center",
        justifyContent: "space-between",
        // paddingHorizontal: 20,
      },
      headerTitleStyle: { color: "#fff", fontFamily: "Lato-Bold" },
    }),
  },
  coupSearch: {
    screen: Search,
    navigationOptions: {
      title: "Search",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
      },
      headerTitleStyle: { color: "#fff", fontFamily: "Lato-Bold" },
    },
  },
  coupAccount: {
    screen: Account,
    navigationOptions: {
      title: "Account",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
      },
      headerTitleStyle: { color: "#fff", fontFamily: "Lato-Bold" },
    },
  },
});
const FilterStack = createStackNavigator({
  SpecialCoupans: {
    screen: Filter,
    navigationOptions: ({ navigation }) => ({
      title: "Filter",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
        alignItems: "center",
        justifyContent: "space-between",
        // paddingHorizontal: 20,
      },
      headerTitleStyle: { color: "#fff", fontFamily: "Lato-Bold" },
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate("filtSearch")}
          style={{ marginLeft: 20 }}
        >
          <Icon name="search" family="Feather" size={20} color={"#fff"} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate("filtAccount")}
          style={{ marginRight: 20 }}
        >
          <Icon name="user" family="Feather" size={20} color={"#fff"} />
        </TouchableOpacity>
      ),
    }),
  },
  filtSearch: {
    screen: Search,
    navigationOptions: {
      title: "Search",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
      },
      headerTitleStyle: { color: "#fff", fontFamily: "Lato-Bold" },
    },
  },
  filtAccount: {
    screen: Account,
    navigationOptions: {
      title: "Account",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
        elevation: 0,
      },
      headerTitleStyle: { color: "#fff", fontFamily: "Lato-Bold" },
    },
  },
});
const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: homeStack,
      navigationOptions: (navigation) => ({
        tabBarLabel: "Home",
        tabBarIcon: ({ focused }) => (
          <Icon
            name="home"
            family="Feather"
            size={20}
            color={focused ? iconActiveTintColor : iconInActiveTintColor}
          />
        ),
      }),
    },
    Whishlist: {
      screen: whishlistStack,
      navigationOptions: {
        tabBarLabel: "Wishlist",
        tabBarIcon: ({ focused }) => (
          <Icon
            name="heart"
            family="Feather"
            size={20}
            color={focused ? iconActiveTintColor : iconInActiveTintColor}
          />
        ),
      },
    },
    Cart: {
      screen: cartStack,
      navigationOptions: {
        tabBarLabel: "Cart",
        tabBarIcon: ({ focused }) => (
          <Icon
            name="shopping-cart"
            family="Feather"
            size={20}
            color={focused ? iconActiveTintColor : iconInActiveTintColor}
          />
        ),
      },
    },
    SpecialCoupans: {
      screen: coupansStack,
      navigationOptions: {
        tabBarLabel: "Chat",
        tabBarIcon: ({ focused }) => (
          <Icon
            name="chat"
            family="MaterialCommunityIcons"
            size={20}
            color={focused ? iconActiveTintColor : iconInActiveTintColor}
          />
        ),
      },
    },
    Filter: {
      screen: FilterStack,
      navigationOptions: {
        tabBarLabel: "Filter",
        tabBarIcon: ({ focused }) => (
          <Icon
            name="filter-variant"
            family="MaterialCommunityIcons"
            size={20}
            color={focused ? iconActiveTintColor : iconInActiveTintColor}
          />
        ),
      },
    },
  },

  {
    tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: "#7be58c",
      inactiveTintColor: "#fff",
      style: {
        padding: 2,
        backgroundColor: ThemeStyle.tabBarBackgroundColor,
      },

      tabStyle: {
        //width: width,
      },
      labelStyle: {
        fontSize: 12,
        fontWeight: "bold",
      },
    },
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      AppTabNavigator: AppTabNavigator,
      Chat: chatStack,
      //   restaurantStack:restaurantStack
    },
    {
      defaultNavigationOptions: {
        header: null,
      },
      initialRouteName: "Auth",
    }
  )
);
