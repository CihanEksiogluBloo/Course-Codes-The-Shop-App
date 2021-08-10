import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import Card from "../../components/UI/Container/Card";
import Input from "../../components/UI/Inputs/Input";
import Color from "../../constants/Color";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
import { inputChangeHandler } from "../../functions/screens/AuthScreen";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

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

const AuthScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const initialState = {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(formReducer, initialState);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      navigation.navigate("Shop");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={20}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              Label="E-mail"
              InputValidities={formState.inputValidities.email}
              Value={formState.inputValues.email}
              ErrorText="Please enter a valid email adress"
              keyboardType="email-address"
              required={true}
              email
              autoCapitalize="none"
              onChangeText={(change) =>
                inputChangeHandler(
                  change,
                  FORM_INPUT_UPDATE,
                  dispatchFormState,
                  "email",
                  true
                )
              }
            />
            <Input
              id="password"
              Label="Password"
              InputValidities={formState.inputValidities.password}
              Value={formState.inputValues.password}
              ErrorText="Please enter a valid password"
              keyboardType="default"
              secureTextEntry
              required={true}
              autoCapitalize="none"
              onChangeText={(change) =>
                inputChangeHandler(
                  change,
                  FORM_INPUT_UPDATE,
                  dispatchFormState,
                  "password",
                  true,
                  undefined,
                  5
                )
              }
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="large" color={Color.primary} />
              ) : (
                <Button
                  title={isSignup ? "Sign Up" : "Login"}
                  color={Color.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                color={Color.accent}
                onPress={() => {
                  setIsSignup((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = () => {
  return {
    headerTitle: "Authenticate",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
