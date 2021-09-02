import React, { useCallback, useState, useReducer, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Feather } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Input from "../../components/UI/Input";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!!!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);

    try {
      await dispatch(action);
      props.navigation.navigate("App");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.navy} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome to Stop Over!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, { backgroundColor: Colors.almond }]}
      >
        <Text style={[styles.text_footer, { color: Colors.navy }]}>Email</Text>
        <View style={styles.action}>
          <Input
            id="email"
            keyboardType="email-address"
            required
            email
            errorText="Please enter a valid email address."
            onInputChange={inputChangeHandler}
            initialValue=""
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={[styles.textInput, { color: Colors.navy }]}
            autoCapitalize="none"
          />
        </View>
        <Text
          style={[styles.text_footer, { color: Colors.navy, marginTop: 35 }]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <Input
            id="password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={6}
            errorText="Please enter a valid password."
            onInputChange={inputChangeHandler}
            initialValue=""
            placeholder="Your Password"
            placeholderTextColor="#666666"
            style={[styles.textInput, { color: Colors.navy }]}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={authHandler}>
            <LinearGradient
              colors={["#fc575e", "#f7b42c"]}
              style={styles.signIn}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <View>
                  {isSignup ? (
                    <Text style={[styles.textSign, { color: "#fff" }]}>
                      Sign Up
                    </Text>
                  ) : (
                    <Text style={[styles.textSign, { color: "#fff" }]}>
                      Log in
                    </Text>
                  )}
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.signIn,
              {
                borderColor: "#f39f86",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
            onPress={() => {
              setIsSignup((prevState) => !prevState);
            }}
          >
            {isSignup ? (
              <Text style={[styles.textSign, { color: Colors.mango }]}>
                Log in
              </Text>
            ) : (
              <Text style={[styles.textSign, { color: Colors.mango }]}>
                Sign up
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navy,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textInput: {
    paddingVertical: -12,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AuthScreen;
