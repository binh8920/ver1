export const CREATE_PROFILE = "CREATE_PROFILE";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const DELETE_PROFILE = "DELETE_PROFILE";
export const SET_PROFILE = "SET_PROFILE";

import Profile from "../../models/profile";

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
      console.log(resData);
      const loadedProfiles = [];

      for (const key in resData) {
        loadedProfiles.push(
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
            resData[key].sleepingArrangement
          )
        );
      }

      dispatch({
        type: SET_PROFILE,
        profiles: loadedProfiles,
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
  address,
  maxGuest,
  sleepingArrangement
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://final-project-ver2-default-rtdb.firebaseio.com/profiles.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application.json",
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
  address,
  maxGuest,
  sleepingArrangement,
  isParents,
  isPetLover,
  isSmoker,
  references
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await fetch(
      `https://final-project-ver2-default-rtdb.firebaseio.com/profiles/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application.json",
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
        isParents,
        isPetLover,
        isSmoker,
        references,
      },
    });
  };
};
