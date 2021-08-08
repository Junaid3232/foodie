/**
 * @format
 */
import React from "react"; // Remember to import React

import { Provider } from "react-redux";
import configStore from "./app/store/config_store";

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
// import HandleNotifications from "./HandleNotifications";

const store = configStore();

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
