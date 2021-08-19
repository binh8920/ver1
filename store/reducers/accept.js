import { ACCEPT_USER } from "../actions/accept";
import Acceptance from "../../models/acceptance";

const initialState = {
    acceptances: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACCEPT_USER: {
            const newAccept = new Acceptance(
                new Date().toString(),
                action.acceptData.requests,
                action.acceptData.amount,
                new Date()
            );
            return {
                ...state,
                acceptances: state.acceptances.concat(newAccept)
            };
        }
    }
    return state;
};