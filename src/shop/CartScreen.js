import React from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/Shop/CartItem";
import Color from "../../constants/Color";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";
import Card from "../../components/UI/Container/Card";

const CartScreen = () => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const i in state.cart.items) {
      transformedCartItems.push({
        productId: i,
        productTitle: state.cart.items[i].productTitle,
        productPrice: state.cart.items[i].productPrice,
        quantity: state.cart.items[i].quantity,
        sum: state.cart.items[i].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total :{" "}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Color.accent}
          title="Order Now"
          onPress={() => {
            dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
          }}
          disabled={cartItems.length === 0}
        />
      </Card>
      <View>
        <Text> Cart Items</Text>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId.toString()}
        renderItem={({ item }) => {
          return (
            <CartItem
              onRemove={() =>
                dispatch(cartActions.removeFromCart(item.productId))
              }
              quantity={item.quantity}
              title={item.productTitle}
              amount={item.productPrice}
              deleteable={true}
            />
          );
        }}
      />
    </View>
  );
};

CartScreen.navigationOptions = () => {
  headerTitle = "Your Cart";
};

const styles = StyleSheet.create({
  screen: { margin: 20 },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Color.primary,
  },
});

export default CartScreen;
