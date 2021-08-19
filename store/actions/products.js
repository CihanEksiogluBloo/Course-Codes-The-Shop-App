import Product from "../../models/product";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://theshopapp-6c970-default-rtdb.europe-west1.firebasedatabase.app/products.json"
      );
      if (!response.ok) {
        throw new Error("Something went  wrong!");
      }

      const resData = await response.json();
      const loadedProduct = [];

      for (const i in resData) {
        loadedProduct.push(
          new Product(
            i,
            resData[i].ownerId,
            resData[i].title,
            resData[i].ownerPushToken,
            resData[i].imageUrl,
            resData[i].description,
            resData[i].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        payload: loadedProduct,
        userProducts: loadedProduct.filter(
          (product) => product.ownerId === userId
        ),
      });
    } catch (error) {
      // send to custom analytics server
      throw error;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await fetch(
      `https://theshopapp-6c970-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: DELETE_PRODUCT, payload: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;
    let pushNotificationToken;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert(
        "Notification Permission Error!",
        "Failed to get push token for push notification!",
        [{ text: "Okey" }]
      );

      const { status: lastResponse } =
        await Notifications.getPermissionsAsync();
      finalStatus = lastResponse;
    }

    if (finalStatus === "granted") {
      pushNotificationToken = (await Notifications.getExpoPushTokenAsync())
        .data;
    } else {
      pushNotificationToken = null;
    }

    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://theshopapp-6c970-default-rtdb.europe-west1.firebasedatabase.app/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
          ownerPushToken: pushNotificationToken,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
        pushToken: pushNotificationToken
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://theshopapp-6c970-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      payload: { title, description, imageUrl },
    });
  };
};
