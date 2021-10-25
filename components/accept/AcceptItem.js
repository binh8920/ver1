import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import RequestItem from "../request/RequestItem";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const AcceptItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.acceptItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>Total Request: {props.amount}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.mango}
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
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
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  acceptItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  amount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888",
  },
  detailItems: {
    width: "100%",
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
});

export default AcceptItem;
