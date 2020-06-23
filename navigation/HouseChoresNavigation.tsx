import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import StartupScreen from "../screens/StartupScreen";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import {
  Alert,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  AsyncStorage,
} from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../modules/user/user";
import { createStackNavigator } from "react-navigation-stack";
import RoomPeople from "../screens/RoomStatistic";

const HomeNavigator = createStackNavigator({
  Home: HomeScreen,
});

const RoomPeopleNavigator = createStackNavigator(
  {
    Room: RoomPeople,
  },
  {
    navigationOptions: {
      title: "Room statistic",
    },
  }
);

const LoggedNavigator = createDrawerNavigator(
  {
    Home: HomeNavigator,
    RoomPeople: RoomPeopleNavigator,
  },
  {
    contentComponent: (props) => {
      const dispatch = useDispatch();

      return (
        <View style={{ flex: 1 }}>
          <SafeAreaView>
            <DrawerItems {...props} />
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Log out",
                  "Do you want to logout?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => {
                        return null;
                      },
                    },
                    {
                      text: "Confirm",
                      onPress: () => {
                        AsyncStorage.clear();
                        dispatch(logout());
                        props.navigation.navigate("Auth");
                      },
                    },
                  ],
                  { cancelable: false }
                )
              }
            >
              <Text style={{ margin: 16, fontWeight: "bold" }}>Logout</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      );
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: LoginScreen,
  App: LoggedNavigator,
});

export default createAppContainer(MainNavigator);
