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
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LoginData } from "../types";

interface Props {
  onSubmit: (data: LoginData) => void;
  error?: string;
  changeMethod: () => void;
}

export default (props: Props) => {
  const { register, handleSubmit, setValue, errors } = useForm<LoginData>();

  useEffect(() => {
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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.welcomeText}>Login to your account</Text>
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
          onEndEditing={handleSubmit(props.onSubmit)}
          onChangeText={(input: string) => setValue("password", input)}
        />
        {props.error && (
          <View>
            <Text style={{ color: "red" }}>{props.error}</Text>
          </View>
        )}
        <View style={styles.button}>
          <Button
            onPress={handleSubmit(props.onSubmit)}
            title="Login"
            type="success"
            style={styles.button}
          />
        </View>
        <View style={styles.changeMethod}>
          <Text>Are you a new user?</Text>
          <TouchableOpacity onPress={props.changeMethod}>
            <Text style={styles.changeMethodText}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 300,
    alignItems: "center",
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
