import React, { useEffect, useCallback, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import CheckMark from "../../components/UI/Buttons/ChackMark";
import Color from "../../constants/Color";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products";
import { titleChangeHandler } from "../../functions/screens/EditProductScreenFunctions";

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
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={(change) =>
              titleChangeHandler(
                change,
                FORM_INPUT_UPDATE,
                dispatchFormState,
                "title"
              )
            }
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
          {!formState.inputValidities.title && (
            <Text>Please enter a valid title!</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={(change) =>
              titleChangeHandler(
                change,
                FORM_INPUT_UPDATE,
                dispatchFormState,
                "imageUrl"
              )
            }
          />
        </View>
        {!editedProduct ? (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={(change) =>
                titleChangeHandler(
                  change,
                  FORM_INPUT_UPDATE,
                  dispatchFormState,
                  "price"
                )
              }
              keyboardType="decimal-pad"
            />
          </View>
        ) : null}
        <View style={styles.formControl}>
          <Text style={styles.label}>Desc</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={(change) =>
              titleChangeHandler(
                change,
                FORM_INPUT_UPDATE,
                dispatchFormState,
                "description"
              )
            }
          />
        </View>
      </View>
    </ScrollView>
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
  formControl: { width: "100%" },
  label: { fontFamily: "open-sans", marginVertical: 8 },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Color.greyish,
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
