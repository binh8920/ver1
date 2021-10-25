import { ACCEPT_USER, SET_ACCEPTANCES } from "../actions/accept";
import Acceptance from "../../models/acceptance";

const initialState = {
  acceptances: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCEPTANCES: {
      return {
        acceptances: action.acceptances,
      };
    }
    case ACCEPT_USER: {
      const newAccept = new Acceptance(
        action.acceptData.id,
        action.acceptData.requestId,
        action.acceptData.requestName,
        action.acceptData.requestAge,
        action.acceptData.requestGender,
        action.acceptData.totalRequest,
        action.acceptData.date
      );
      return {
        ...state,
        acceptances: state.acceptances.concat(newAccept),
      };
    }
  }
  return state;
};
