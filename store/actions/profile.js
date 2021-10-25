export const CREATE_PROFILE = "CREATE_PROFILE";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const DELETE_PROFILE = "DELETE_PROFILE";
export const SET_PROFILE = "SET_PROFILE";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Profile from "../../models/profile";
import ENV from "../../env";

export const fetchProfiles = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://final-project-ver2-default-rtdb.firebaseio.com/profiles.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedProfiles = [];

      for (const key in resData) {
        await loadedProfiles.push(
          new Profile(
            key,
            resData[key].privateId,
            resData[key].name,
            resData[key].age,
            resData[key].gender,
            resData[key].imgURL,
            resData[key].couchStatus,
            resData[key].visitedCountries,
            resData[key].languages,
            resData[key].occupation,
            resData[key].education,
            resData[key].hometown,
            resData[key].interest,
            resData[key].reasonForCS,
            resData[key].hostOffer,
            resData[key].address,
            resData[key].maxGuest,
            resData[key].sleepingArrangement,
            resData[key].latitude,
            resData[key].longitude,
            resData[key].privatePushToken
          )
        );
      }

      dispatch({
        type: SET_PROFILE,
        profiles: loadedProfiles.filter((prof) => prof.privateId !== userId),
        privateProfile: loadedProfiles.find(
          (prof) => prof.privateId === userId
        ),
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProfile = (profileId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await fetch(
      `https://final-project-ver2-default-rtdb.firebaseio.com/profiles/${profileId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    dispatch({
      type: DELETE_PROFILE,
      pid: profileId,
    });
  };
};

export const createProfile = (
  name,
  age,
  gender,
  imgURL,
  couchStatus,
  visitedCountries,
  languages,
  occupation,
  education,
  hometown,
  interest,
  reasonForCS,
  hostOffer,
  location,
  maxGuest,
  sleepingArrangement
) => {
  return async (dispatch, getState) => {
    let pushToken;
    let statusObject = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (statusObject.status !== "granted") {
      statusObject = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (statusObject.status !== "granted") {
      pushToken = null;
    } else {
      pushToken = (await Notifications.getExpoPushTokenAsync()).data;
    }

    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const responseLocation = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    );

    if (!responseLocation.ok) {
      throw new Error("Something went wrong!");
    }

    const resLocation = await responseLocation.json();
    if (!resLocation.results) {
      throw new Error("Something went wrong!");
    }

    const address = resLocation.results[0].formatted_address;

    const response = await fetch(
      `https://final-project-ver2-default-rtdb.firebaseio.com/profiles.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          privateId: userId,
          name,
          age,
          gender,
          imgURL,
          couchStatus,
          visitedCountries,
          languages,
          occupation,
          education,
          hometown,
          interest,
          reasonForCS,
          hostOffer,
          address,
          maxGuest,
          sleepingArrangement,
          latitude: location.lat,
          longitude: location.lng,
          privatePushToken: pushToken,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PROFILE,
      profileData: {
        id: resData.name,
        privateId: userId,
        name,
        age,
        gender,
        imgURL,
        couchStatus,
        visitedCountries,
        languages,
        occupation,
        education,
        hometown,
        interest,
        reasonForCS,
        hostOffer,
        address,
        maxGuest,
        sleepingArrangement,
        latitude: location.lat,
        longitude: location.lng,
        privatePushToken: pushToken,
      },
    });
  };
};

export const editProfile = (
  id,
  name,
  age,
  gender,
  imgURL,
  couchStatus,
  visitedCountries,
  languages,
  occupation,
  education,
  hometown,
  interest,
  reasonForCS,
  hostOffer,
  location,
  maxGuest,
  sleepingArrangement
) => {
  return async (dispatch, getState) => {
    let pushToken;
    let statusObject = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (statusObject.status !== "granted") {
      statusObject = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (statusObject.status !== "granted") {
      pushToken = null;
    } else {
      pushToken = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(pushToken);
    }

    const token = getState().auth.token;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    console.log(resData);
    if (!resData.results) {
      throw new Error("Something went wrong!");
    }

    const address = resData.results[0].formatted_address;
    console.log(address);

    await fetch(
      `https://final-project-ver2-default-rtdb.firebaseio.com/profiles/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          age,
          gender,
          imgURL,
          couchStatus,
          visitedCountries,
          languages,
          occupation,
          education,
          hometown,
          interest,
          reasonForCS,
          hostOffer,
          address,
          maxGuest,
          sleepingArrangement,
          latitude: location.lat,
          longitude: location.lng,
          privatePushToken: pushToken,
        }),
      }
    );

    dispatch({
      type: EDIT_PROFILE,
      pid: id,
      profileData: {
        name,
        age,
        gender,
        imgURL,
        couchStatus,
        visitedCountries,
        languages,
        occupation,
        education,
        hometown,
        interest,
        reasonForCS,
        hostOffer,
        address,
        maxGuest,
        sleepingArrangement,
        latitude: location.lat,
        longitude: location.lng,
        privatePushToken: pushToken,
      },
    });
  };
};
