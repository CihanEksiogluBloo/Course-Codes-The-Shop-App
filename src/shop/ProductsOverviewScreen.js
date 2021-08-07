import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  StyleSheet,
  FlatList,
  LogBox,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/Shop/ProductItem";
import HamburgerButton from "../../components/UI/Buttons/HamburgerButton";
import HeaderButton from "../../components/UI/Buttons/HeaderButton";
import * as cartActions from "../../store/actions/cart";
import Color from "../../constants/Color";
import * as productActions from "../../store/actions/products";

const ProductsOverviewScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState();

  //state.products.availableProducts
  //.products == combinereducer Key on App.js
  //.availableProducts == initialState key on store/reducer/products.js

  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setRefreshing(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (error) {
      setError(error.message);
    }
    setRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = navigation.addListener("willFocus", loadProducts);
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    LogBox.ignoreLogs([
      "interpolate() was renamed to interpolateNode() in Reanimated 2. Please use interpolateNode() instead",
    ]);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id, title) => {
    navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.warningText}>An error occured!</Text>
        <Button
          color={Color.primary}
          title="Try Again"
          onPress={loadProducts}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  }
  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.warningText}>
          No Product found. Maybe start adding some!
        </Text>
      </View>
    );
  }

  //react navigation 4 error fixed with rn 5

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={refreshing}
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

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  warningText: {
    color: Color.primary,
    fontFamily: "open-sans-bold",
  },
});

export default ProductsOverviewScreen;
