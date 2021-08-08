import React, { Component } from "react";
import OneSignal from "react-native-onesignal";
import AppWithNavigationState from "./app/components/navigation/Routes";

export class App extends Component {
  constructor(props) {
    console.log("------In App.js------");
    super(props);
    OneSignal.init(process.env.onesignal_key);
    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("ids", this.onIds);
    OneSignal.configure();
  }

  onReceived = (notification) => {
    console.log("Notification received: ", notification);
  };

  onOpened = (openResult) => {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
  };

  onIds = (device) => {
    console.log("Device info: ", device);
    this.setState({ device });
  };
}

export default AppWithNavigationState;
