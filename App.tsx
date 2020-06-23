import React from "react";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";

import store from "./config/store";
import HouseChoresNavigation from "./navigation/HouseChoresNavigation";

enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <HouseChoresNavigation />
    </Provider>
  );
}
