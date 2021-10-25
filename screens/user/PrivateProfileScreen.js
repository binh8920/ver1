import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import AvatarSection from "../../components/profile/AvatarSection";
import StatusSection from "../../components/profile/StatusSection";
import ConditionSection from "../../components/profile/ConditionSection";
import AboutMeSection from "../../components/profile/AboutMeSection";
import ExperienceSection from "../../components/profile/ExperienceSection";
import Colors from "../../constants/Colors";
import * as profileActions from "../../store/actions/profile";

const PrivateProfileScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const selectedProfile = useSelector((state) => state.profile.privateProfile);
  const dispatch = useDispatch();

  const editProfileHandler = (id) => {
    props.navigation.navigate("Edit", { profileId: id });
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(profileActions.fetchProfiles()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.darkGrey} />
    </View>;
  }

  if (!selectedProfile) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Please create your profile!</Text>
        <View style={styles.editView}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Edit");
            }}
          >
            <LinearGradient
              colors={["#fc575e", "#f7b42c"]}
              style={styles.create}
            >
              <Text style={styles.textLogout}>Create Your Profile</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
          references={selectedProfile.references}
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

        <View style={styles.editView}>
          <TouchableOpacity
            onPress={() => {
              editProfileHandler(selectedProfile.id);
            }}
          >
            <LinearGradient
              colors={["#fc575e", "#f7b42c"]}
              style={styles.logout}
            >
              <Text style={styles.textLogout}>Edit Profile</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

PrivateProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Profile",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    borderRadius: 20,
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
  editView: {
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  create: {
    width: "70%",
    height: 50,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
});

export default PrivateProfileScreen;
