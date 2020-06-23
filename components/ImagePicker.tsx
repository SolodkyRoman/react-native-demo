import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default (props: any) => {
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status !== "granted") {
      Alert.alert(
        "You have rejected camera permissions",
        "Please, give permissions to use your camera",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
      base64: true,
    });
    props.setImageError(false);
    props.setImage(image.base64);
  };

  return (
    <View style={styles.imagePicker}>
      <TouchableOpacity style={styles.imageCircle} onPress={takeImageHandler}>
        {props.image ? (
          <Image
            source={{ uri: "data:image/jpeg;base64," + props.image }}
            style={{ height: "100%", width: "100%" }}
          />
        ) : (
          <View>
            <MaterialIcons name="camera-alt" size={40} color="white" />
          </View>
        )}
      </TouchableOpacity>

      {(!props.image || props.imageError) && (
        <Text style={props.imageError && styles.errorText}>
          Please select an image
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  imageCircle: {
    backgroundColor: "grey",
    borderRadius: 200,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    overflow: "hidden",
  },
  errorText: {
    color: "red",
  },
});
