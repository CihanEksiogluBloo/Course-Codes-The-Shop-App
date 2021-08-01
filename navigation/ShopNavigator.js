import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import ProductsOverviewScreen from "../src/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../src/shop/ProductDetailScreen";
import OrdersScreen from "../src/shop/OrdersScreen";
import UserProductScreen from "../src/user/UserProductScreen";
import CartScreen from "../src/shop/CartScreen";
import EditProductScreen from "../src/user/EditProductScreen";
import Color from "../constants/Color";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const defaultNavigationOptions = {
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Color.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Color.primary,
  headerBackTitleStyle: { fontFamily: "open-sans" },
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name={"md-cart"} size={24} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name={"md-list"} size={24} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProduct: UserProductScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name={"md-list"} size={24} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Color.primary,
    },
  }
);

export default createAppContainer(ShopNavigator);