import { SET_REFERENCES, GIVE_REFERENCE } from "../actions/reference";
import Reference from "../../models/reference";

const initialState = {
  references: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REFERENCES: {
      return {
        references: action.references,
      };
    }
    case GIVE_REFERENCE: {
      const newReference = new Reference(
        action.referenceData.id,
        action.referenceData.hostPrivateUserId,
        action.referenceData.guestImage,
        action.referenceData.guestName,
        action.referenceData.guestAge,
        action.referenceData.guestGender,
        action.referenceData.star,
        action.referenceData.description
      );
      return {
        ...state,
        references: state.references.concat(newReference),
      };
    }
  }
  return state;
};
