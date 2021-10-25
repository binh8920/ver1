import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Image,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import * as profileActions from "../../store/actions/profile";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

const MapScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const markers = useSelector((state) => state.profile.allProfile);

  const mapRegion = {
    latitude: 21.58,
    longitude: 105.82,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(profileActions.fetchProfiles());
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.darkGrey} />
    </View>;
  }

  return (
    <View style={styles.container}>
      <MapView
        region={mapRegion}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
      >
        {markers.map((marker) => {
          return (
            <Marker
              coordinate={{
                latitude: marker.latitude ? marker.latitude : 0,
                longitude: marker.longitude ? marker.longitude : 0,
              }}
              image={require("../../assets/mark3.png")}
            >
              <Callout tooltip>
                <View style={styles.placeItem}>
                  <View style={styles.imageContainer}>
                    {/* <Image
                      style={styles.image}
                      source={{ uri: marker.imgURL }}
                    /> */}
                    <AntDesign name="user" size={28} color="white" />
                  </View>
                  <View>
                    <Text style={styles.name}>{marker.name}</Text>
                    <View style={styles.info}>
                      <Text style={styles.subInfo}>({marker.age}, </Text>
                      <Text style={styles.subInfo}>{marker.gender})</Text>
                    </View>
                    <Text style={styles.couchStatus}>{marker.couchStatus}</Text>
                  </View>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

MapScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Explore",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeItem: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 300,
    borderWidth: 1,
    borderColor: Colors.navy,
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    flexDirection: "row",
  },
  name: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  subInfo: {
    fontFamily: "open-sans",
    fontSize: 10,
    color: Colors.darkGrey,
  },
  couchStatus: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: Colors.redOrange,
  },
  imageContainer: {
    backgroundColor: Colors.navy,
    marginRight: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MapScreen;
