import React from "react";
import { StyleSheet, Button, FlatList } from "react-native";
import ProductItem from "../../components/Shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import HamburgerButton from "../../components/UI/Buttons/HamburgerButton";
import Color from "../../constants/Color";
import CreateButton from "../../components/UI/Buttons/CreateButton";
import {
  editProductHandler,
  deleteHandler,
} from "../../functions/screens/UserProductScreenFunctions";
import CenteredText from "../../components/UI/Container/CenteredText";

const UserProductScreen = ({ navigation }) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  if (userProducts.length === 0) {
    return (
      <CenteredText>
        No product found , maybe start creating some?
      </CenteredText>
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <ProductItem
            ImageUrl={item.imageUrl}
            Title={item.title}
            Price={item.price}
            onPress={() => {
              editProductHandler(item.id, navigation.navigate);
            }}
          >
            <Button
              color={Color.primary}
              title="Edit"
              onPress={() => {
                editProductHandler(item.id, navigation.navigate);
              }}
            />

            <Button
              color={Color.primary}
              title="Delete"
              onPress={() => {
                deleteHandler(item.id, dispatch);
              }}
            />
          </ProductItem>
        );
      }}
    />
  );
};

UserProductScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "User Product",
    headerLeft: () => (
      <HamburgerButton
        onPress={() => {
          navigation.toggleDrawer();
        }}
      />
    ),
    headerRight: () => (
      <CreateButton
        onPress={() => {
          navigation.navigate("EditProduct");
        }}
      />
    ),
  };
};

const styles = StyleSheet.create({});

export default UserProductScreen;
