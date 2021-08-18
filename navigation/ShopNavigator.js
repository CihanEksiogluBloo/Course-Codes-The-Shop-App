import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";

import ProductsOverviewScreen, {
  screenOptions as ProductsOverviewScreenOptions,
} from "../src/shop/ProductsOverviewScreen";
import ProductDetailScreen, {
  screenOptions as ProductsDetailScreenOptions,
} from "../src/shop/ProductDetailScreen";
import OrdersScreen, {
  screenOptions as ordersScreenOptions,
} from "../src/shop/OrdersScreen";
import UserProductScreen, {
  screenOptions as UserProductScreenOptions,
} from "../src/user/UserProductScreen";
import CartScreen, {
  screenOptions as CartScreenOptions,
} from "../src/shop/CartScreen";
import EditProductScreen, {
  screenOptions as EditProductScreenOptions,
} from "../src/user/EditProductScreen";
import AuthScreen, {
  screenOptions as AuthScreenOptions,
} from "../src/user/AuthScreen";
//import StartupScreen from "../src/StartupScreen";

import Color from "../constants/Color";
import { Platform, View, Button, SafeAreaView } from "react-native";
//import { Ionicons } from "@expo/vector-icons";
import React from "react";

import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

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

const ProductsStack = createStackNavigator();
export const ProductsNavigator = () => {
  return (
    <ProductsStack.Navigator screenOptions={defaultNavigationOptions}>
      <ProductsStack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={ProductsOverviewScreenOptions}
      />
      <ProductsStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={ProductsDetailScreenOptions}
      />
      <ProductsStack.Screen
        name="Cart"
        component={CartScreen}
        options={CartScreenOptions}
      />
    </ProductsStack.Navigator>
  );
};

/*
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
*/

const OrdersStack = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStack.Navigator screenOptions={defaultNavigationOptions}>
      <OrdersStack.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStack.Navigator>
  );
};

/*
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
*/

const AdminStack = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStack.Navigator screenOptions={defaultNavigationOptions}>
      <AdminStack.Screen
        name="UserProduct"
        component={UserProductScreen}
        options={UserProductScreenOptions}
      />
      <AdminStack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={EditProductScreenOptions}
      />
    </AdminStack.Navigator>
  );
};
/*
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
*/

const ShopDrawer = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawer.Navigator
      drawerContentOptions={{
        activeTintColor: Color.primary,
      }}
      drawerContent={(props) => {
        return (
          <SafeAreaView style={{ flex: 1, paddingTop: 25 }}>
            <View
              style={{ flex: 1 }}
              forceInset={{ top: "always", horizontal: "never" }}
            >
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Color.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                  //props.navigation.navigate("Auth");
                }}
              />
            </View>
          </SafeAreaView>
        );
      }}
    >
      <ShopDrawer.Screen name="Products" component={ProductsNavigator} />
      <ShopDrawer.Screen name="Orders" component={OrdersNavigator} />
      <ShopDrawer.Screen name="Admin" component={AdminNavigator} />
    </ShopDrawer.Navigator>
  );
};
/*
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
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <SafeAreaView style={{ flex: 1, paddingTop: 25 }}>
          <View
            style={{ flex: 1 }}
            forceInset={{ top: "always", horizontal: "never" }}
          >
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Color.primary}
              onPress={() => {
                dispatch(authActions.logout());
                //props.navigation.navigate("Auth");
              }}
            />
          </View>
        </SafeAreaView>
      );
    },
  }
);
*/

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={AuthScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
/*
const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavigationOptions,
  }
);
*/
