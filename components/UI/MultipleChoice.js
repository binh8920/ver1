import React from "react";
import { StyleSheet, View, Text } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import PropTypes from "prop-types";

const CSChoices = (props) => {
  const { onChecked, value, title, id, currentId } = props;

  const onCheckHandler = (val) => {
    if (val) {
      onChecked && onChecked(value, id);
      return;
    }
    onChecked && onChecked(null, id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          onValueChange={(val) => {
            onCheckHandler(val);
          }}
          value={id === currentId}
        />
        <Text style={styles.label}>{title}</Text>
      </View>
    </View>
  );
};

CSChoices.propTypes = {
  onChecked: PropTypes.func,
  value: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.number,
  currentId: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    fontFamily: "open-sans",
  },
});

export default CSChoices;
