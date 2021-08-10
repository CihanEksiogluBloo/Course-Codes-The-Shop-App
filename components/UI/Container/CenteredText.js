import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Color from "../../../constants/Color";

const CenteredText = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
  },
  text: {
    color: Color.primary,
    fontFamily: "open-sans-bold",
    margin:5,
    
  },
});

export default CenteredText;
