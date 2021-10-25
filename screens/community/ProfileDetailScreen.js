import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../../constants/Colors";
import AvatarSection from "../../components/profile/AvatarSection";
import StatusSection from "../../components/profile/StatusSection";
import ConditionSection from "../../components/profile/ConditionSection";
import AboutMeSection from "../../components/profile/AboutMeSection";
import ExperienceSection from "../../components/profile/ExperienceSection";
import * as requestActions from "../../store/actions/request";

const ProfileDetailScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const profileId = props.navigation.getParam("profileId");
  const selectedProfile = useSelector((state) =>
    state.profile.allProfile.find((prof) => prof.id === profileId)
  );
  const privateProfile = useSelector((state) => state.profile.privateProfile);
  const dispatch = useDispatch();

  const onRequest = useCallback(async () => {
    if (privateProfile) {
      setIsLoading(true);
      await dispatch(
        requestActions.requestToHost(
          selectedProfile.privateId,
          privateProfile.name,
          privateProfile.gender,
          privateProfile.age,
          privateProfile.privatePushToken
        )
      );
      setIsLoading(false);
    } else {
      Alert.alert(
        "You have to create your profile!",
        "Please create your profile to request hosts.",
        [{ text: "Okay" }]
      );
      return;
    }
  }, [dispatch]);

  const goToReferenceScreenHandler = () => {
    props.navigation.navigate("References", {
      profId: selectedProfile.id,
      profPrivateId: selectedProfile.privateId,
    });
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <AvatarSection
          image={selectedProfile.imgURL}
          name={selectedProfile.name}
          age={selectedProfile.age}
          gender={selectedProfile.gender}
        />

        <StatusSection
          address={selectedProfile.address}
          couchStatus={selectedProfile.couchStatus}
          onRating={goToReferenceScreenHandler}
        />

        <ConditionSection
          maxGuest={selectedProfile.maxGuest}
          sleepingArrangement={selectedProfile.sleepingArrangement}
        />

        <AboutMeSection
          languages={selectedProfile.languages}
          occupation={selectedProfile.occupation}
          education={selectedProfile.education}
          hometown={selectedProfile.hometown}
          interest={selectedProfile.interest}
        />

        <ExperienceSection
          visitedCountries={selectedProfile.visitedCountries}
          reasonForCS={selectedProfile.reasonForCS}
          hostOffer={selectedProfile.hostOffer}
        />

        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.mango} />
        ) : (
          <View
            style={{
              alignItems: "center",
              marginBottom: 20,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={onRequest}>
              <LinearGradient
                colors={[Colors.mango, "#f7b42c"]}
                style={styles.logout}
              >
                <Text style={styles.textLogout}>Request Host</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderRadius: 10,
    marginBottom: 30,
  },
  logout: {
    width: "70%",
    height: 50,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  textLogout: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "white",
  },
});

export default ProfileDetailScreen;
