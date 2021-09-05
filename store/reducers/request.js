import {
  REQUEST_TO_HOST,
  REMOVE_REQUEST,
  SET_REQUEST,
} from "../actions/request";
import { ACCEPT_USER } from "../actions/accept";
import Request from "../../models/request";

const initialState = {
  requests: [],
  totalRequest: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REQUEST: {
      return {
        requests: action.requests,
        totalRequest: action.totalRequest,
      };
    }
    case REQUEST_TO_HOST: {
      const requestedProfile = action.profile;
      const profProfileId = requestedProfile.profProfileId;
      const profPrivateUserId = requestedProfile.privateUserId;
      const profName = requestedProfile.name;
      const profAge = requestedProfile.age;
      const profGender = requestedProfile.gender;
      const profAddress = requestedProfile.address;

      if (state.requests[requestedProfile.id]) {
        //already have profile in request
        return { ...state };
      } else {
        const newRequest = new Request(
          profProfileId,
          profPrivateUserId,
          profName,
          profGender,
          profAge,
          profAddress
        );
        return {
          ...state,
          requests: { ...state.requests, [requestedProfile.id]: newRequest },
          totalRequest: state.totalRequest + 1,
        };
      }
    }
    case REMOVE_REQUEST: {
      const updatedRequests = { ...state.requests };
      delete updatedRequests[action.profId];
      return {
        ...state,
        requests: updatedRequests,
        totalRequest: state.totalRequest - 1,
      };
    }
    case ACCEPT_USER:
      return initialState;
  }
  return state;
};
