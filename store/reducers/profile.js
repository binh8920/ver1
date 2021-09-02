import {
  CREATE_PROFILE,
  EDIT_PROFILE,
  DELETE_PROFILE,
  SET_PROFILE,
} from "../actions/profile";
import Profile from "../../models/profile";

const initialState = {
  allProfile: [],
  privateProfile: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE: {
      return {
        allProfile: action.profiles,
        privateProfile: action.privateProfile,
      };
    }
    case EDIT_PROFILE: {
      const profileId = state.privateProfile.id;
      profileId === action.pid;
      const editedProfile = new Profile(
        action.pid,
        state.privateProfile.privateId,
        action.profileData.name,
        action.profileData.age,
        action.profileData.gender,
        action.profileData.imgURL,
        action.profileData.couchStatus,
        action.profileData.visitedCountries,
        action.profileData.languages,
        action.profileData.occupation,
        action.profileData.education,
        action.profileData.hometown,
        action.profileData.interest,
        action.profileData.reasonForCS,
        action.profileData.hostOffer,
        action.profileData.address,
        action.profileData.maxGuest,
        action.profileData.sleepingArrangement
      );

      const allProfileIndex = state.allProfile.findIndex(
        (profile) => profile.id === action.pid
      );

      const editedAllProfile = [...state.allProfile];
      editedAllProfile[allProfileIndex] = editedProfile;

      return {
        ...state,
        allProfile: editedAllProfile,
        privateProfile: editedProfile,
      };
    }
    case CREATE_PROFILE: {
      const newProfile = new Profile(
        action.profileData.id,
        action.profileData.privateId,
        action.profileData.name,
        action.profileData.age,
        action.profileData.gender,
        action.profileData.imgURL,
        action.profileData.couchStatus,
        action.profileData.visitedCountries,
        action.profileData.languages,
        action.profileData.occupation,
        action.profileData.education,
        action.profileData.hometown,
        action.profileData.interest,
        action.profileData.reasonForCS,
        action.profileData.hostOffer,
        action.profileData.address,
        action.profileData.maxGuest,
        action.profileData.sleepingArrangement
      );
      return {
        ...state,
        allProfile: state.allProfile.concat(newProfile),
        privateProfile: state.privateProfile.concat(newProfile),
      };
    }
  }
  return state;
};
