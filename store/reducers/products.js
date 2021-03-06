import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/products";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.payload,
        userProducts: action.userProducts,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.payload
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.payload
        ),
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.payload.id,
        action.payload.ownerId,
        action.payload.title,
        action.payload.pushToken,
        action.payload.imageUrl,
        action.payload.description,
        action.payload.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };

    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid.toString(),
        state.userProducts[productIndex].ownerId,
        action.payload.title,
        action.userProducts[productIndex].pushToken,
        action.payload.imageUrl,
        action.payload.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.pid
      );

      const updatedAvailableProductIndex = [...state.availableProducts];
      updatedAvailableProductIndex[availableProductIndex] = updatedProduct;

      return {
        ...state,
        userProducts: updatedUserProducts,
        availableProducts: updatedAvailableProductIndex,
      };

    default:
      state;
  }
  return state;
};
