import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import Colors from "../../constants/Colors";
import { Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";

const StatusSection = (props) => {
  return (
    <View style={styles.userInfoSection}>
      <View style={styles.row}>
        <Entypo name="location" size={20} color={Colors.darkGrey} />
        <Text style={{ color: Colors.darkGrey, marginLeft: 20 }}>
          {props.address}
        </Text>
      </View>
      <TouchableOpacity style={styles.row} onPress={props.onRating}>
        <MaterialIcons name="format-quote" size={20} color={Colors.navy} />
        <Text style={{ color: Colors.navy, marginLeft: 20 }}>References</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <AntDesign name="paperclip" size={20} color={Colors.darkGrey} />
        <Text style={{ color: Colors.darkGrey, marginLeft: 20 }}>
          {props.couchStatus}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default StatusSection;
