import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Color from "../../../constants/Color";

const Input = (props) => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.Label}</Text>

      <TextInput {...props} style={styles.input} value={props.Value} />
      {!props.InputValidities && props.required && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{props.ErrorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Color.greyish,
    borderBottomWidth: 1,
  },
  formControl: { width: "100%" },
  label: { fontFamily: "open-sans", marginVertical: 8 },
  errorMessage: {
    color: "red",
    fontFamily:"open-sans-bold",
    fontSize:13
  },
  errorContainer:{
    marginVertical:5,

  }
});

export default Input;
