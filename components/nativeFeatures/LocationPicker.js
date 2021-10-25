import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const { onLocationPicked } = props;

  const getLocationHandler = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert("Could not fetch location!", "Please try again", [
        { text: "Okay" },
      ]);
    }
    setIsFetching(false);
  };
  return (
    <View style={styles.locationPicker}>
      {isFetching ? (
        <ActivityIndicator size="large" color={Colors.darkGrey} />
      ) : (
        <TouchableOpacity
          style={styles.takeLocation}
          onPress={getLocationHandler}
        >
          <Entypo name="location-pin" size={30} color="black" />
        </TouchableOpacity>
      )}
      <View style={styles.imgStatus}>
        {!pickedLocation ? (
          <Text style={styles.statusError}>
            There is no Location has taken!
          </Text>
        ) : (
          <Text style={styles.status}>Location has taken!</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    margin: 15,
    flexDirection: "row",
  },
  takeLocation: {
    backgroundColor: Colors.darkGrey,
    padding: 15,
    width: 60,
    borderRadius: 30,
  },
  imgStatus: {
    marginTop: 18,
    marginLeft: 10,
  },
  status: {
    fontFamily: "open-sans",
    color: "green",
  },
  statusError: {
    fontFamily: "open-sans",
    color: Colors.redOrange,
  },
});

export default LocationPicker;
