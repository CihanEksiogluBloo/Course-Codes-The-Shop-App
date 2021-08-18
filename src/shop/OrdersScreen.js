import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "../../components/Shop/OrderItem";
import HamburgerButton from "../../components/UI/Buttons/HamburgerButton";
import Color from "../../constants/Color";
import * as ordersActions from "../../store/actions/orders";
import CenteredText from "../../components/UI/Container/CenteredText";

const OrdersScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(ordersActions.fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (orders.length === 0) {
    return (
      <CenteredText>No orders found, Let's start ordering some product?</CenteredText>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <OrderItem
            items={item.items}
            Amount={item.totalAmount}
            Date={item.date}
          />
        );
      }}
    />
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HamburgerButton
        onPress={() => {
          navigation.toggleDrawer();
        }}
      />
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;
