import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../../constants/Colors";

const RequestItem = (props) => {
  return (
    <View style={styles.requestItem}>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>Name:</Text>
        <Text style={styles.subText}>{props.name}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>Age:</Text>
        <Text style={styles.subText}>{props.age}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>Gender:</Text>
        <Text style={styles.subText}>{props.gender}</Text>
      </View>
      <View style={styles.requestAction}>
        {props.accept && (
          <TouchableOpacity
            onPress={props.onAccept}
            style={[
              styles.acceptButton,
              { borderRightColor: "#dddddd", borderRightWidth: 1 },
            ]}
          >
            <Text style={styles.buttonText}>ACCEPT</Text>
          </TouchableOpacity>
        )}
        {props.delete && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}
          >
            <Text style={styles.buttonText}>DELETE</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  requestItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    marginRight: 15,
  },
  subText: {
    fontFamily: "open-sans",
    color: Colors.darkGrey,
    fontSize: 14,
  },
  requestAction: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  deleteButton: {
    height: 40,
    width: 100,
    backgroundColor: Colors.redOrange,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  acceptButton: {
    height: 40,
    width: 100,
    backgroundColor: Colors.mango,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "white",
  },
});

export default RequestItem;
