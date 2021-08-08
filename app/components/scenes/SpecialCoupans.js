import React, { Component } from "react";
import CreateRoom from "./CreatRoom";
import ChatRoom from "./ChatRoom";

class SpecialCoupans extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <ChatRoom navigation={this.props.navigation} />;
  }
}

export default SpecialCoupans;
