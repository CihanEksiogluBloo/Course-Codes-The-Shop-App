import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "../../components/Shop/OrderItem";
import HamburgerButton from "../../components/UI/Buttons/HamburgerButton";

const OrdersScreen = () => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return <OrderItem items = {item.items} Amount={item.totalAmount} Date={item.date} />;
      }}
    />
  );
};

OrdersScreen.navigationOptions = ({ navigation }) => {
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

const styles = StyleSheet.create({});

export default OrdersScreen;
