import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Input from "./Input";
import Button from "./Button";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SignUpData } from "../types";
import ImagePicker from "./ImagePicker";

interface Props {
  onSubmit: (data: SignUpData, image: string) => void;
  error?: string;
  changeMethod: () => void;
}

export default (props: Props) => {
  const { register, handleSubmit, setValue, errors } = useForm<SignUpData>();
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    register("name", {
      required: true,
      minLength: 2,
      maxLength: 20,
    });
    register("email", {
      required: true,
      minLength: 10,
      maxLength: 20,
      pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    });
    register("password", {
      required: true,
      minLength: 4,
      maxLength: 15,
    });
  }, [register]);

  const onSignUp = (data: SignUpData) => {
    if (image) {
      props.onSubmit(data, image);
    } else {
      setImageError(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.welcomeText}>Create an account</Text>
        <ImagePicker
          image={image}
          setImage={setImage}
          setImageError={setImageError}
          imageError={imageError}
        />
        <Input
          style={styles.input}
          error={errors.name}
          // @ts-ignore
          placeholder="Name"
          autoCapitalize="none"
          onChangeText={(input: string) => setValue("name", input)}
        />
        <Input
          style={styles.input}
          error={errors.email}
          // @ts-ignore
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(input: string) => setValue("email", input)}
        />
        <Input
          style={styles.input}
          error={errors.password}
          // @ts-ignore
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(input: string) => setValue("password", input)}
        />
        {props.error && (
          <View>
            <Text style={{ color: "red" }}>{props.error}</Text>
          </View>
        )}
        <View style={styles.button}>
          <Button
            onPress={handleSubmit(onSignUp)}
            title="Sign up"
            type="success"
            style={styles.button}
          />
        </View>
        <View style={styles.changeMethod}>
          <Text>Do you have an account?</Text>
          <TouchableOpacity onPress={props.changeMethod}>
            <Text style={styles.changeMethodText}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 50,
  },
  input: {
    width: "80%",
  },
  changeMethod: {
    marginTop: "auto",
    marginBottom: 100,
    width: "80%",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  changeMethodText: {
    color: "#007AFF",
  },
  button: {
    marginTop: 30,
    width: 150,
    height: 40,
    justifyContent: "center",
  },
});
