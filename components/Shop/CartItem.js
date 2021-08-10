import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Color from "../../constants/Color";

const CartItem = ({
  onRemove,
  quantity,
  title,
  amount,
  deleteable,
}) => {
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemData}>
        <Text style={styles.quantity}>{quantity} </Text>
        <Text style={styles.mainText}>{title}</Text>
      </Text>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>{amount} </Text>
        {deleteable != true ? (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Feather name="trash" size={24} color="red" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "open-sans",
    color: Color.greyish,
    fontSize: 16,
  },
  mainText: {
    fontFamily: "open-sans",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
