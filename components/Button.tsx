import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default (props: any) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{
      ...styles.button,
      ...props.style,
      ...(props.type === "success" && styles.successButton),
    }}
  >
    <Text style={styles.text}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#acacac",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  successButton: {
    backgroundColor: "#56dd73",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
