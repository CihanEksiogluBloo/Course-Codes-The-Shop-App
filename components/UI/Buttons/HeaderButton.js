import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Color from "../../../constants/Color";

const HeaderButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <AntDesign
        name="shoppingcart"
        size={24}
        color={Platform.OS === "android" ? "white" : Color.primary}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 10 },
});

export default HeaderButton;
