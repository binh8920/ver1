import Request from "../../models/request";

export const REQUEST_TO_HOST = "REQUEST_TO_HOST";
export const REMOVE_REQUEST = "REMOVE_REQUEST";

const fetchRequest = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://final-project-cebfa-default-rtdb.firebaseio.com/requests/Bi.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      const loadedRequests = [];

      for (const key in resData) {
        loadedRequests.push(
          new Request(
            key,
            resData[key].profileName,
            resData[key].profileGender,
            resData[key].profileAge,
            resData[key].profileAddress
          )
        );
      }
      dispatch({
        type: REQUEST_TO_HOST,
        requests: loadedRequests,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const requestToHost = (profile) => {
  return { type: REQUEST_TO_HOST, profile: profile };
};

export const removeRequest = (profileId) => {
  return { type: REMOVE_REQUEST, profId: profileId };
};
