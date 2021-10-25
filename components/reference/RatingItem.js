import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const RatingItem = (props) => {
  const maxRating = [1, 2, 3, 4, 5];
  const starImgFilled =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png";
  const starImgCorner =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png";

  return (
    <Card style={styles.container}>
      <View style={styles.guestInfo}>
        <Image source={{ uri: props.image }} style={styles.image} />
        <View style={styles.infoAndRatingContainer}>
          <View style={styles.info}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.subInfo}>
              ({props.age}, {props.gender})
            </Text>
          </View>
          <View style={styles.rating}>
            {maxRating.map((item, key) => {
              return (
                <Image
                  style={styles.star}
                  source={
                    item <= props.star
                      ? { uri: starImgFilled }
                      : { uri: starImgCorner }
                  }
                />
              );
            })}
          </View>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{props.description}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 10,
  },
  guestInfo: {
    flexDirection: "row",
  },
  info: {
    flexDirection: "row",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    marginLeft: 10,
  },
  star: {
    width: 20,
    height: 20,
    resizeMode: "cover",
    marginLeft: 3,
  },
  descriptionContainer: {
    height: 60,
    width: 320,
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Colors.darkGrey,
    margin: 10,
  },
  name: {
    fontFamily: "open-sans-bold",
    color: Colors.black,
    fontSize: 16,
  },
  subInfo: {
    fontFamily: "open-sans",
    color: Colors.darkGrey,
    fontSize: 10,
    marginLeft: 5,
    marginTop: 5,
  },
  rating: {
    flexDirection: "row",
  },
  description: {
    paddingLeft: 10,
    paddingTop: 3,
    fontFamily: "open-sans",
  },
});

export default RatingItem;
