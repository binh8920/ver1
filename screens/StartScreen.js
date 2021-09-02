import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import * as authActions from "../store/actions/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";

const StartScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryTime } = transformedData;
      const expirationTime = new Date(expiryTime);

      if (expirationTime <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }
      const expiration = expirationTime.getTime() - new Date().getTime();

      props.navigation.navigate("App");

      dispatch(authActions.authenticate(userId, token, expiration));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.navy} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartScreen;
