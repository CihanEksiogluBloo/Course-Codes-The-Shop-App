import React from "react";
import { StyleSheet, View } from "react-native";

const Card = ({ children, style }) => {
  return <View style={{ ...styles.cart, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  cart: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
});

export default Card;
