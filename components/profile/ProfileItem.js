import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const ProfileItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.address}>{props.address}</Text>
          <Text style={styles.couchStatus}>{props.couchStatus}</Text>
          <View style={styles.speaks}>
            <MaterialIcons
              name="messenger"
              size={18}
              color={Colors.darkGrey}
              style={{ marginTop: 4 }}
            />
            <Text style={styles.textDetail}>{props.languages}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textDetail: {
    fontFamily: "open-sans",
    color: Colors.darkGrey,
    fontSize: 12,
    marginLeft: 5,
  },
  name: {
    fontFamily: "open-sans-bold",
    color: Colors.black,
    fontSize: 18,
  },
  speaks: {
    flexDirection: "row",
    marginBottom: 5,
  },
  placeItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  address: {
    fontFamily: "open-sans",
    color: Colors.navy,
    fontSize: 14,
  },
  couchStatus: {
    fontFamily: "open-sans",
    color: Colors.redOrange,
    fontSize: 14,
  },
});

export default ProfileItem;
