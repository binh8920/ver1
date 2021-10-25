import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { firebaseConfig } from "./firebase";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import * as firebase from "firebase";
import * as Notifications from "expo-notifications";
import ReduxThunk from "redux-thunk";

import profileReducer from "./store/reducers/profile";
import requestReducer from "./store/reducers/request";
import acceptReducer from "./store/reducers/accept";
import authReducer from "./store/reducers/auth";
import referenceReducer from "./store/reducers/reference";
import NavigationContainer from "./navigation/NavigationContainer";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true };
  },
});

const rootReducer = combineReducers({
  profile: profileReducer,
  request: requestReducer,
  accept: acceptReducer,
  auth: authReducer,
  reference: referenceReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
