import { Alert } from "react-native";
import * as productActions from "../../store/actions/products"


export const editProductHandler = (id,navigationNavigate) => {
    navigationNavigate("EditProduct", { productId: id });
  };

export const deleteHandler = (id,dispatch) => {
  Alert.alert("Are you sure?", "Do you Really want to delete this item?", [
    { text: "No", style: "default" },
    {
      text: "Yes",
      style: "destructive",
      onPress: () => {
        dispatch(productActions.deleteProduct(id));
      },
    },
  ]);
};