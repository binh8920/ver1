import React, { useEffect, useState, useCallback } from "react";
import { FlatList, ActivityIndicator, View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProfileItem from "../../components/profile/ProfileItem";
import * as profileActions from "../../store/actions/profile";
import Colors from "../../constants/Colors";

const ProfileOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const profiles = useSelector((state) => state.profile.allProfile);
  const dispatch = useDispatch();

  const loadProfiles = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(profileActions.fetchProfiles());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProfiles
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadProfiles]);

  useEffect(() => {
    setIsLoading(true);
    loadProfiles().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProfiles]);

  if (error) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadProfiles}
          color={Colors.redOrange}
        />
      </View>
    );
  }

  if (isLoading) {
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <ActivityIndicator size="large" color={Colors.almond} />
    </View>;
  }

  return (
    <FlatList
      onRefresh={loadProfiles}
      refreshing={isRefreshing}
      keyExtractor={(item) => item.id}
      data={profiles}
      renderItem={(itemData) => (
        <ProfileItem
          image={itemData.item.imgURL}
          name={itemData.item.name}
          address={itemData.item.address}
          couchStatus={itemData.item.couchStatus}
          references={itemData.item.references}
          languages={itemData.item.languages}
          onSelect={() => {
            props.navigation.navigate("Profile", {
              profileId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

export default ProfileOverviewScreen;
