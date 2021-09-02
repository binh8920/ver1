import React, { useEffect } from "react";
import { ScrollView, StyleSheet, SafeAreaView, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Button } from "react-native-elements";

import HeaderButton from "../../components/UI/HeaderButton";
import AvatarSection from "../../components/profile/AvatarSection";
import StatusSection from "../../components/profile/StatusSection";
import ConditionSection from "../../components/profile/ConditionSection";
import AboutMeSection from "../../components/profile/AboutMeSection";
import ExperienceSection from "../../components/profile/ExperienceSection";
import Colors from "../../constants/Colors";

const PrivateProfileScreen = (props) => {
  const selectedProfile = useSelector((state) => state.profile.privateProfile);
  const dispatch = useDispatch();

  const editProfileHandler = (id) => {
    props.navigation.navigate("Edit", { profileId: id });
  };

  if (!selectedProfile) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Please create your profile!</Text>
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

        <View style={{ alignItems: "center", margin: 20 }}>
          <Button
            title="Edit Profile"
            type="outline"
            color={Colors.almond}
            onPress={() => {
              editProfileHandler(selectedProfile.id);
            }}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

PrivateProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Profile",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName="md-create"
          onPress={() => {
            navData.navigation.navigate("Edit");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PrivateProfileScreen;
