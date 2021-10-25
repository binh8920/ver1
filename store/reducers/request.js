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
      if (state.requests[action.requestData.profileId]) {
        //already have profile in request
        return { ...state };
      } else {
        const newRequest = new Request(
          action.requestData.hostPrivateId,
          action.requestData.profName,
          action.requestData.profGender,
          action.requestData.profAge,
          action.requestData.guestPushToken
        );
        return {
          ...state,
          requests: state.requests.concat(newRequest),
        };
      }
    }
    case REMOVE_REQUEST: {
      return {
        ...state,
        requests: state.requests.filter((req) => req.id !== action.requestId),
        totalRequest: state.totalRequest - 1,
      };
    }
    case ACCEPT_USER:
      return {
        ...state,
        requests: state.requests.filter((req) => req.id !== action.requestId),
        totalRequest: state.totalRequest - 1,
      };
  }
  return state;
};
