import React from "react";
import { View, StyleSheet } from "react-native";

const Separator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: "#555",
    height: 0.5,
    flex: 1,
  },
});
export default Separator;
