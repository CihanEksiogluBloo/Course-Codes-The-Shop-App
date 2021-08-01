import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Color from "../../../constants/Color";

const CheckMark = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Ionicons
        onPress={onPress}
        name="checkmark-circle"
        size={24}
        color={Platform.OS === "android" ? "white" : Color.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 10 },
});

export default CheckMark;
