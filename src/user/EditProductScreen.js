import React, { useEffect, useCallback, useReducer } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import CheckMark from "../../components/UI/Buttons/ChackMark";
import Color from "../../constants/Color";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products";
import { inputChangeHandler } from "../../functions/screens/EditProductScreenFunctions";
import Input from "../../components/UI/Inputs/Input";

//useReducer types
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

//useReducer Reducer
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.payload,
    };
    const updatedValitidies = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedformIsValid = true;

    for (const key in updatedValitidies) {
      updatedformIsValid = updatedformIsValid && updatedValitidies[key];
    }

    return {
      formIsValid: updatedformIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValitidies,
    };
  }
  return state;
};

const EditProductScreen = ({ navigation }) => {
  const prodId = navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  const dispatch = useDispatch();
  const initialState = {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  };

  const [formState, dispatchFormState] = useReducer(formReducer, initialState);

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check your errors in the form.", [
        { text: "Okey" },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        productActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          formState.inputValues.price
        )
      );
    }
    navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            Label="Title"
            ErrorText="Please enter valid Title"
            onChangeText={(change) =>
              inputChangeHandler(
                change,
                FORM_INPUT_UPDATE,
                dispatchFormState,
                "title",
                true
              )
            }
            Value={formState.inputValues.title}
            InputValidities={formState.inputValidities.title}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            required={true}
          />

          <Input
            Label="Image URL"
            ErrorText="Please enter valid Image URL"
            Value={formState.inputValues.imageUrl}
            InputValidities={formState.inputValidities.imageUrl}
            onChangeText={(change) =>
              inputChangeHandler(
                change,
                FORM_INPUT_UPDATE,
                dispatchFormState,
                "imageUrl"
              )
            }
          />

          {!editedProduct ? (
            <Input
              Label="Price"
              ErrorText="Please enter valid Price"
              Value={formState.inputValues.price}
              InputValidities={formState.inputValidities.price}
              keyboardType="decimal-pad"
              required={true}
              onChangeText={(change) =>
                inputChangeHandler(
                  change,
                  FORM_INPUT_UPDATE,
                  dispatchFormState,
                  "price",
                  true,
                  0.1
                )
              }
            />
          ) : null}

          <Input
            Label="Description"
            ErrorText="Please enter valid Description"
            Value={formState.inputValues.description}
            InputValidities={formState.inputValidities.description}
            multiline
            autoCorrect
            numberOfLines={3}
            onChangeText={(change) =>
              inputChangeHandler(
                change,
                FORM_INPUT_UPDATE,
                dispatchFormState,
                "description"
              )
            }
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = ({ navigation }) => {
  const submitFunction = navigation.getParam("submit");
  return {
    headerTitle: navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => <CheckMark onPress={submitFunction} />,
  };
};

const styles = StyleSheet.create({
  form: { margin: 20 },
});

export default EditProductScreen;
