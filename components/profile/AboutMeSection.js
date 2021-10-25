import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Title } from "react-native-paper";

import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const AboutMeSection = (props) => {
  return (
    <View style={styles.additionInfoSection}>
      <Title style={{ marginBottom: 15 }}>About me</Title>
      <View style={styles.row}>
        <FontAwesome5 name="language" size={18} color={Colors.redOrange} />
        <Text style={{ color: Colors.darkGrey, marginLeft: 15 }}>
          {props.languages}
        </Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="work" size={18} color={Colors.redOrange} />
        <Text style={{ color: Colors.darkGrey, marginLeft: 20 }}>
          {props.occupation}
        </Text>
      </View>
      <View style={styles.row}>
        <Ionicons name="school" size={18} color={Colors.redOrange} />
        <Text style={{ color: Colors.darkGrey, marginLeft: 20 }}>
          {props.education}
        </Text>
      </View>
      <View style={styles.row}>
        <FontAwesome5 name="baby" size={18} color={Colors.redOrange} />
        <Text style={{ color: Colors.darkGrey, marginLeft: 25 }}>
          {props.hometown}
        </Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="favorite" size={18} color={Colors.redOrange} />
        <View style={styles.rowInterest}>
          <ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            maxWidth={350}
            // height={50}
            // style={styles.chipsScrollView}
            // contentContainerStyle={{
            //   paddingRight: Platform.OS === "android" ? 20 : 0,
            // }}
          >
            <Text style={{ color: Colors.darkGrey, marginLeft: 20 }}>
              {props.interest}
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  additionInfoSection: {
    paddingHorizontal: 20,
    marginTop: 10,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  rowInterest: {
    flexDirection: "row",
    marginBottom: 30,
  },
  chipsScrollView: {
    position: "absolute",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 42,
    borderWidth: 0.5,
    borderColor: Colors.redOrange,
  },
  interest: {
    color: Colors.darkGrey,
  },
});

export default AboutMeSection;
