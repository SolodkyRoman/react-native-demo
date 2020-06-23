import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";

import LoginForm from "../components/LoginForm";
import { login, signUp } from "../modules/user/user";
import { AppState, LoginData, SignUpData } from "../types";
import SignUpForm from "../components/SignUpForm";

export default (props: any): ReactElement => {
  const { isLoading, token, error } = useSelector(
    (state: AppState) => state.user
  );
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      props.navigation.navigate("Home");
    }
  });

  const onLogin = (data: LoginData) => {
    dispatch(login(data.email, data.password));
  };

  const onSignUp = (data: SignUpData, imageBase64: string) => {
    dispatch(signUp(data.name, data.email, data.password, imageBase64));
  };

  const changeMethod = () => {
    setIsLogin((value) => {
      return !value;
    });
  };

  if (isLoading) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#3143ca" />
    );
  }

  if (isLogin) {
    return (
      <LoginForm onSubmit={onLogin} error={error} changeMethod={changeMethod} />
    );
  }

  return (
    <SignUpForm onSubmit={onSignUp} error={error} changeMethod={changeMethod} />
  );
};
