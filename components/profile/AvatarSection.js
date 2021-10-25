import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";

const AvatarSection = (props) => {
  return (
    <View style={styles.userInfoSection}>
      <View style={{ flexDirection: "column", marginTop: 15 }}>
        {/* <Avatar.Image source={{ uri: props.image }} size={80} /> */}
        <View style={styles.imagePreview}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <View style={{ marginLeft: 10, flexDirection: "row" }}>
          <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
            {props.name}
          </Title>
          <Caption style={styles.caption}>
            ({props.age}, {props.gender})
          </Caption>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoSection: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
  },
  caption: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 25,
  },
  imagePreview: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export default AvatarSection;
