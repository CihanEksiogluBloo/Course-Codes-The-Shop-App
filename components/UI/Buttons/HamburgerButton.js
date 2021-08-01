import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Color from "../../../constants/Color";

const HamburgerButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <FontAwesome5
        onPress={onPress}
        name="hamburger"
        size={24}
        color={Platform.OS === "android" ? "white" : Color.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 10 },
});

export default HamburgerButton;
