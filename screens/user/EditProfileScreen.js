import React, { useEffect, useCallback, useReducer, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  Text,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import * as profileActions from "../../store/actions/profile";
import HeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";
import CSChoices from "../../components/UI/MultipleChoice";
import { ListItem } from "react-native-elements";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditProfileScreen = (props) => {
  const dispatch = useDispatch();
  const profId = props.navigation.getParam("profileId");
  const editedProfile = useSelector((state) =>
    state.profile.allProfile.find((prof) => prof.id === profId)
  );

  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);

  const [checkedValue, setCheckedValue] = useState(null);
  const [currentCheck, setCurrentCheck] = useState(-1);

  const onChecked = (value, id) => {
    if (value) {
      setCheckedValue({ value: value, id: id });
      setCurrentCheck(id);
    } else {
      Alert.alert("You have to check the boxes!", "Please select one.", [
        { text: "Okay" },
      ]);
    }
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: editedProfile ? editedProfile.name : "",
      age: editedProfile ? editedProfile.age : "",
      gender: editedProfile ? editedProfile.gender : "",
      languages: editedProfile ? editedProfile.languages : "",
      imgURL: editedProfile ? editedProfile.imgURL : "",
      visitedCountries: editedProfile ? editedProfile.visitedCountries : "",
      occupation: editedProfile ? editedProfile.occupation : "",
      education: editedProfile ? editedProfile.education : "",
      hometown: editedProfile ? editedProfile.hometown : "",
      interest: editedProfile ? editedProfile.interest : "",
      reasonForCS: editedProfile ? editedProfile.reasonForCS : "",
      hostOffer: editedProfile ? editedProfile.hostOffer : "",
      address: editedProfile ? editedProfile.address : "",
      maxGuest: editedProfile ? editedProfile.maxGuest : "",
      sleepingArrangement: editedProfile
        ? editedProfile.sleepingArrangement
        : "",
    },
    inputValidities: {
      name: editedProfile ? true : false,
      age: editedProfile ? true : false,
      gender: editedProfile ? true : false,
      imgURL: editedProfile ? true : false,
      visitedCountries: editedProfile ? true : false,
      languages: editedProfile ? true : false,
      occupation: editedProfile ? true : false,
      education: editedProfile ? true : false,
      hometown: editedProfile ? true : false,
      interest: editedProfile ? true : false,
      reasonForCS: editedProfile ? true : false,
      hostOffer: editedProfile ? true : false,
      address: editedProfile ? true : false,
      maxGuest: editedProfile ? true : false,
      sleepingArrangement: editedProfile ? true : false,
    },
    formIsValid: editedProfile ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    if (editedProfile) {
      dispatch(
        profileActions.editProfile(
          profId,
          formState.inputValues.name,
          +formState.inputValues.age,
          formState.inputValues.gender,
          formState.inputValues.imgURL,
          checkedValue.value,
          formState.inputValues.visitedCountries,
          formState.inputValues.languages,
          formState.inputValues.occupation,
          formState.inputValues.education,
          formState.inputValues.hometown,
          formState.inputValues.interest,
          formState.inputValues.reasonForCS,
          formState.inputValues.hostOffer,
          formState.inputValues.address,
          +formState.inputValues.maxGuest,
          formState.inputValues.sleepingArrangement
        )
      );
    } else {
      dispatch(
        profileActions.createProfile(
          formState.inputValues.name,
          +formState.inputValues.age,
          formState.inputValues.gender,
          formState.inputValues.imgURL,
          checkedValue.value,
          formState.inputValues.visitedCountries,
          formState.inputValues.languages,
          formState.inputValues.occupation,
          formState.inputValues.education,
          formState.inputValues.hometown,
          formState.inputValues.interest,
          formState.inputValues.reasonForCS,
          formState.inputValues.hostOffer,
          formState.inputValues.address,
          +formState.inputValues.maxGuest,
          formState.inputValues.sleepingArrangement
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, profId, formState, checkedValue]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.title}>Stop Over Status</Text>
        <CSChoices
          id={1}
          value={"Accepting Guests"}
          title={"Accepting Guests"}
          onChecked={onChecked}
          currentId={currentCheck}
        />
        <CSChoices
          id={2}
          value={"Maybe Accepting Guests"}
          title={"Maybe Accepting Guests"}
          onChecked={onChecked}
          currentId={currentCheck}
        />
        <CSChoices
          id={3}
          value={"Not Accepting Guests"}
          title={"Not Accepting Guests"}
          onChecked={onChecked}
          currentId={currentCheck}
        />
        {/* about me */}
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title style={styles.title}>About Me</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          <Input
            id="name"
            label=" Your Name"
            errorText="Please enter a valid name!"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProfile ? editedProfile.name : ""}
            initiallyValid={!!editedProfile}
            required
          />
          <Input
            id="age"
            label="Your Age"
            errorText="Please enter a valid age!"
            keyboardType="numeric"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={`${editedProfile ? editedProfile.age : ""}`}
            initiallyValid={!!editedProfile}
            required
            min={18}
          />
          <Input
            id="gender"
            label="Your Gender"
            errorText="Please enter a valid gender!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProfile ? editedProfile.gender : ""}
            initiallyValid={!!editedProfile}
            required
          />
          <Input
            id="imgURL"
            label="Image URL"
            errorText="Please enter a valid image URL!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProfile ? editedProfile.imgURL : ""}
            initiallyValid={!!editedProfile}
            required
          />
          <Input
            id="languages"
            label="Your Languages"
            errorText="Please enter a valid languages!"
            keyboardType="default"
            autoCapitalize="words"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProfile ? editedProfile.languages : ""}
            initiallyValid={!!editedProfile}
            required
          />
          <Input
            id="occupation"
            label="Your Occupation"
            errorText="Please enter a valid occupation!"
            keyboardType="default"
            autoCapitalize="words"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProfile ? editedProfile.occupation : ""}
            initiallyValid={!!editedProfile}
            required
          />
          <Input
            id="education"
            label="Your Education"
            errorText="Please enter a valid education!"
            keyboardType="default"
            autoCapitalize="words"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProfile ? editedProfile.education : ""}
            initiallyValid={!!editedProfile}
            required
          />
          <Input
            id="hometown"
            label="Your Hometown"
            errorText="Please enter a valid hometown!"
            keyboardType="default"
            autoCapitalize="words"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProfile ? editedProfile.hometown : ""}
            initiallyValid={!!editedProfile}
            required
          />
          <Input
            id="interest"
            label="Your Interest"
            errorText="Please enter a valid interest!"
            keyboardType="default"
            autoCapitalize="words"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProfile ? editedProfile.interest : ""}
            initiallyValid={!!editedProfile}
            required
          />
        </ListItem.Accordion>

        {/* my condition */}
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title style={styles.title}>
                  My Condition
                </ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded1}
          onPress={() => {
            setExpanded1(!expanded1);
          }}
        >
          <Input
            id="address"
            label="Your Address"
            errorText="Please enter a valid address!"
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProfile ? editedProfile.address : ""}
            initiallyValid={!!editedProfile}
            required
          />
          <Input
            id="maxGuest"
            label="Number of guests you can receive"
            errorText="Please enter a valid number!"
            keyboardType="numeric"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={`${editedProfile ? editedProfile.maxGuest : ""}`}
            initiallyValid={!!editedProfile}
            required
            min={0}
          />
          <Input
            id="sleepingArrangement"
            label="Your Sleeping Arrangement"
            errorText="Please enter a valid hometown!"
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={
              editedProfile ? editedProfile.sleepingArrangement : ""
            }
            initiallyValid={!!editedProfile}
            required
          />
        </ListItem.Accordion>

        {/* my experience */}
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title style={styles.title}>
                  My Experience
                </ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded2}
          onPress={() => {
            setExpanded2(!expanded2);
          }}
        >
          <Input
            id="visitedCountries"
            label="Your Visited Countries"
            errorText="Please enter a valid country!"
            keyboardType="default"
            autoCapitalize="words"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProfile ? editedProfile.visitedCountries : ""}
            initiallyValid={!!editedProfile}
            required
          />
          <Input
            id="reasonForCS"
            label="Your Reason On Stop Over"
            errorText="Please enter a valid reason!"
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProfile ? editedProfile.reasonForCS : ""}
            initiallyValid={!!editedProfile}
            required
          />
          <Input
            id="hostOffer"
            label="Your Offer For Hosts"
            errorText="Please enter a valid offer!"
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProfile ? editedProfile.hostOffer : ""}
            initiallyValid={!!editedProfile}
            required
          />
        </ListItem.Accordion>
      </View>
    </ScrollView>
  );
};

EditProfileScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("profileId")
      ? "Edit Profile"
      : "Add Profile",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "open-sans-bold",
  },
});

export default EditProfileScreen;
