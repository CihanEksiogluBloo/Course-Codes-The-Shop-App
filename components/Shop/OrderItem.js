import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Color from "../../constants/Color";
import CartItem from "./CartItem";
import Card from "../UI/Container/Card";

const OrderItem = ({ Amount, Date, items }) => {
  // <CartItem onRemove quantity title amount />
  const [showDetail, setShowDetail] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>$ {Amount}</Text>
        <Text style={styles.date}>{Date.toString().slice(0, 21)}</Text>
      </View>
      <Button
        title={showDetail ? "Hide Detail" : "Show Details"}
        color={Color.primary}
        onPress={() => {
          setShowDetail((prevState) => !prevState);
        }}
      />
      {showDetail ? (
        <View style={styles.detailItems}>
          {items.map((cartItem) => (
            <CartItem
              deleteable={true}
              onRemove={() => {}}
              quantity={cartItem.quantity}
              title={cartItem.productTitle}
              amount={cartItem.sum}
              key={cartItem.productId.toString()}
            />
          ))}
        </View>
      ) : null}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  detailItems: { width: "100%" },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  amount: { fontFamily: "open-sans", fontSize: 16 },
  date: { fontFamily: "open-sans", fontSize: 16, color: Color.greyish },
});

export default OrderItem;
