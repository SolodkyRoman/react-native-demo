import React, { ReactElement } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActionSheetIOS,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  id: number;
  toggleStatus: (id: number, status: boolean) => void;
  deleteItem: (id: number) => void;
  done: boolean;
  text: string;
  doneBy?: string;
}

export default (props: Props): ReactElement => {
  const onLongPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          "Cancel",
          `${props.done ? "Mark as to do" : "Mark as done"}`,
          "Delete",
        ],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          props.toggleStatus(props.id, props.done);
        } else if (buttonIndex === 2) {
          props.deleteItem(props.id);
        }
      }
    );
  };
  return (
    <TouchableOpacity
      style={{
        ...styles.listItem,
        ...(props.done && styles.listItemDone),
      }}
      onPress={() => props.toggleStatus(props.id, props.done)}
      onLongPress={onLongPress}
    >
      <View>
        <Text style={styles.actionText}>{props.text}</Text>
        {props.doneBy ? (
          <Text style={styles.executorText}>Done by: {props.doneBy}</Text>
        ) : null}
      </View>
      {props.done ? (
        <MaterialIcons name="check" size={24} color="white" />
      ) : (
        <MaterialIcons name="close" size={24} color="white" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  listItem: {
    width: "80%",
    height: 55,
    backgroundColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  listItemDone: {
    backgroundColor: "#62ce00",
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  executorText: {
    marginTop: 4,
    color: "white",
    fontSize: 12,
  },
});
