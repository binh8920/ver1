import PROFILES from "../../data/dummy-data";
import { CREATE_PROFILE, EDIT_PROFILE, DELETE_PROFILE } from "../actions/profile";
import Profile from "../../models/profile";

const initialState = {
    allProfile: PROFILES,
    privateProfile: PROFILES.find(prof => prof.id === 'p1')
};

export default (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PROFILE: {
            const profileId = state.privateProfile.id;
            profileId === action.pid;
            const editedProfile = new Profile(
                action.pid,
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
                action.profileData.sleepingArrangement,
            );
            return {
                ...state,
                privateProfile: editedProfile
            };
        }
    }
    return state;
};

