import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import RatingItem from "../../components/reference/RatingItem";
import * as referenceAction from "../../store/actions/reference";

const ReferencesScreen = (props) => {
  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const profileId = props.navigation.getParam("profId");
  const hostId = props.navigation.getParam("profPrivateId");
  const references = useSelector((state) => state.reference.references);
  const hostReferences = references.filter(
    (ref) => ref.hostPrivateUserId === hostId
  );
  const privateProfile = useSelector((state) => state.profile.privateProfile);
  const selectedProfile = useSelector((state) =>
    state.profile.allProfile.find((prof) => prof.id === profileId)
  );

  const starImgFilled =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png";
  const starImgCorner =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png";

  const descriptionChangeHandler = (text) => {
    if (text.trim().length === 0) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    setDescription(text);
  };

  const submitHandler = useCallback(async () => {
    if (!isValid) {
      Alert.alert("Wrong input!", "Please enter your description", [
        { text: "Okay" },
      ]);
      return;
    }
    if (!privateProfile) {
      Alert.alert(
        "You have to create your profile!",
        "Please create your profile to give host references.",
        [{ text: "Okay" }]
      );
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        referenceAction.giveReference(
          selectedProfile.privateId,
          privateProfile.imgURL,
          privateProfile.name,
          privateProfile.age,
          privateProfile.gender,
          defaultRating,
          description
        )
      );
    } catch (err) {
      setError(err.message);
    }
    setDescription("");
    setDefaultRating(0);
  }, [dispatch, selectedProfile, privateProfile, defaultRating, description]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(referenceAction.fetchReferences());
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={styles.star}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}
            >
              <Image
                style={styles.image}
                source={
                  item <= defaultRating
                    ? { uri: starImgFilled }
                    : { uri: starImgCorner }
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={descriptionChangeHandler}
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          multiline
          numberOfLines={3}
        />
      </View>
      {!isValid && (
        <Text style={styles.errorText}>Please give me your opinion!</Text>
      )}
      <TouchableOpacity onPress={submitHandler}>
        <LinearGradient colors={["#fc575e", "#f7b42c"]} style={styles.submit}>
          <Text style={styles.textSubmit}>Submit</Text>
        </LinearGradient>
      </TouchableOpacity>
      {/* {isLoading ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <ActivityIndicator size="large" color={Colors.darkGrey} />
        </View>
      ) : ( */}
      <FlatList
        keyExtractor={(item) => item.id}
        data={hostReferences}
        renderItem={(itemData) => (
          <RatingItem
            image={itemData.item.guestImage}
            name={itemData.item.guestName}
            age={itemData.item.guestAge}
            gender={itemData.item.guestGender}
            description={itemData.item.description}
            star={itemData.item.star}
          />
        )}
      />
      {/* )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  star: {
    justifyContent: "center",
    flexDirection: "row",
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    marginTop: 10,
    marginLeft: 5,
  },
  submit: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  textSubmit: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "white",
  },
  inputContainer: {
    height: 100,
    width: 380,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.black,
    margin: 10,
  },
  input: {
    paddingLeft: 10,
    marginBottom: 20,
  },
  headerText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  errorText: {
    fontSize: 13,
    color: Colors.redOrange,
  },
});

export default ReferencesScreen;
