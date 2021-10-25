import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import * as requestActions from "../../store/actions/request";
import * as acceptActions from "../../store/actions/accept";
import Card from "../../components/UI/Card";
import RequestItem from "../../components/request/RequestItem";

const RequestScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const totalRequest = useSelector((state) => state.request.totalRequest);
  const requests = useSelector((state) => state.request.requests);
  const privateId = useSelector(
    (state) => state.profile.privateProfile.privateId
  );
  const privateRequests = requests.filter(
    (req) => req.hostPrivateUserId === privateId
  );
  const dispatch = useDispatch();
  console.log(requests);

  const loadRequests = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(requestActions.fetchRequest());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadRequests
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadRequests]);

  useEffect(() => {
    setIsFetching(true);
    loadRequests().then(() => {
      setIsFetching(false);
    });
  }, [dispatch, loadRequests]);

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this request?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(requestActions.removeRequest(id));
        },
      },
    ]);
  };

  const acceptRequestHandler = async (
    requestId,
    requestName,
    requestAge,
    requestGender,
    totalRequest,
    guestPushToken
  ) => {
    setIsLoading(true);
    await dispatch(
      acceptActions.acceptUser(
        requestId,
        requestName,
        requestAge,
        requestGender,
        totalRequest,
        guestPushToken
      )
    );
    setIsLoading(false);
  };

  if (error) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadRequests}
          color={Colors.redOrange}
        />
      </View>
    );
  }

  if (isFetching) {
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.darkGrey} />
    </View>;
  }

  return (
    <ScrollView style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total Request: <Text style={styles.amount}>{totalRequest}</Text>
        </Text>
      </Card>
      {isLoading ? (
        <ActivityIndicator style={styles.centered} size="large" />
      ) : (
        <FlatList
          onRefresh={loadRequests}
          refreshing={isRefreshing}
          data={privateRequests}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <RequestItem
              name={itemData.item.profileName}
              gender={itemData.item.profileGender}
              age={itemData.item.profileAge}
              delete
              onRemove={deleteHandler.bind(this, itemData.item.id)}
              accept
              onAccept={acceptRequestHandler.bind(
                this,
                itemData.item.id,
                itemData.item.profileName,
                itemData.item.profileAge,
                itemData.item.profileGender,
                totalRequest,
                itemData.item.guestPushToken
              )}
            />
          )}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RequestScreen;
