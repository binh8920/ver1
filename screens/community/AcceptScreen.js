import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, ActivityIndicator, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AcceptItem from "../../components/accept/AcceptItem";
import Colors from "../../constants/Colors";
import * as acceptActions from "../../store/actions/accept";

const AcceptScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const acceptances = useSelector((state) => state.accept.acceptances);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(acceptActions.fetchAcceptances());
  }, [dispatch]);

  if (isLoading) {
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.darkGrey} />
    </View>;
  }

  return (
    <FlatList
      data={acceptances}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <AcceptItem
          amount={itemData.item.totalRequest}
          date={itemData.item.readableDate}
          requests={itemData.item.requests}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AcceptScreen;
