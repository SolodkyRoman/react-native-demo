import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { FieldError } from "react-hook-form";

interface Props extends TextInput {
  error?: FieldError;
  style: object;
}

export default ({ error, style, ...props }: Props) => {
  return (
    <TextInput
      {...props}
      style={{ ...styles.input, ...style, ...(error && styles.error) }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  error: {
    borderBottomColor: "red",
  },
});
