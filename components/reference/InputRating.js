import React, { useReducer, useEffect } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const InputRating = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value,
    isValid: props.isValid,
    touched: false,
  });

  const { onInputChange } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange]);

  const textChangeHandler = (text) => {
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "open-sans",
    color: "red",
    fontSize: 13,
  },
});

export default InputRating;
