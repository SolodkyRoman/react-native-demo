import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, Picker } from "react-native";

import Button from "./Button";

export default (props: any) => {
  const [selectedValue, setSelectedValue] = useState("Play the doge");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.open}
      onRequestClose={props.onClose}
    >
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.heading}>Please, select a task</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedValue}
              style={{
                height: 200,
                width: 200,
              }}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="Walk the dog" value="Walk the dog" />
              <Picker.Item label="Wash the dishes" value="Wash the dishes" />
              <Picker.Item label="Clean the floor" value="Clean the floor" />
              <Picker.Item label="Cook the dinner" value="Cook the dinner" />
              <Picker.Item label="Buy products" value="Buy products" />
            </Picker>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={props.onClose}
              title="Discard"
              style={styles.button}
            />
            <Button
              onPress={() => props.onSubmit(selectedValue)}
              title="Add"
              type="success"
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 30,
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
  },
  pickerContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#ee3f5a",
    flex: 1,
    marginHorizontal: 5,
  },
});
