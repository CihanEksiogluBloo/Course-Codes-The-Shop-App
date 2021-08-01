import React from "react";
import { View, Button, Text, StyleSheet, FlatList, LogBox } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/Shop/ProductItem";
import HamburgerButton from "../../components/UI/Buttons/HamburgerButton";
import HeaderButton from "../../components/UI/Buttons/HeaderButton";
import * as cartActions from "../../store/actions/cart";
import Color from "../../constants/Color";

const ProductsOverviewScreen = ({ navigation }) => {
  //state.products.availableProducts
  //.products == combinereducer Key on App.js
  //.availableProducts == initialState key on store/reducer/products.js

  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  //react navigation 4 error fixed with rn 5
  LogBox.ignoreLogs([
    "interpolate() was renamed to interpolateNode() in Reanimated 2. Please use interpolateNode() instead",
  ]);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <ProductItem
            ImageUrl={item.imageUrl}
            Title={item.title}
            Price={item.price}
            onPress={() => {
              selectItemHandler(item.id, item.title);
            }}
          >
            <Button
              color={Color.primary}
              title="View Details"
              onPress={() => {
                selectItemHandler(item.id, item.title);
              }}
            />
            <Button
              color={Color.primary}
              title="To Cart"
              onPress={() => {
                dispatch(cartActions.addToCart(item));
              }}
            />
          </ProductItem>
        );
      }}
    />
  );
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "All Products",
    headerRight: () => (
      <HeaderButton onPress={() => navigation.navigate("Cart")} />
    ),
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

export default ProductsOverviewScreen;
