import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Color from "../../constants/Color";
import Card from "../UI/Container/Card";

const ProductItem = ({
  ImageUrl,
  Title,
  Price,
  children,
  onPress
}) => {
  let TouchableComp =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

      let updatePrice = +Price
      updatePrice = updatePrice.toFixed(2)

  return (
    <Card style={styles.product}>
      <TouchableComp onPress={onPress}  useForeground>
        <View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: ImageUrl }} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{Title}</Text>
            <Text style={styles.price}>${updatePrice}</Text>
          </View>
          <View style={styles.actions}>{children}</View>
        </View>
      </TouchableComp>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20,
  },
  details: {
    alignItems: "center",
    height: "17%",
    padding: 10,
    fontFamily: "open-sans",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
});

export default ProductItem;
