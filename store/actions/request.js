import Request from "../../models/request";

export const REQUEST_TO_HOST = "REQUEST_TO_HOST";
export const REMOVE_REQUEST = "REMOVE_REQUEST";
export const SET_REQUEST = "SET_REQUEST";

export const fetchRequest = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://final-project-ver2-default-rtdb.firebaseio.com/requests/.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      console.log(resData);

      const loadedRequests = [];

      for (const key in resData) {
        loadedRequests.push(
          new Request(
            key,
            resData[key].profileId,
            resData[key].privateUserId,
            resData[key].profileName,
            resData[key].profileGender,
            resData[key].profileAge,
            resData[key].profileAddress
          )
        );
      }
      dispatch({
        type: SET_REQUEST,
        requests: loadedRequests,
        totalRequest: loadedRequests.length,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const requestToHost = (profile) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://final-project-ver2-default-rtdb.firebaseio.com/requests/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          profileId: profile.id,
          privateUserId: profile.privateUserId,
          profileName: profile.profileName,
          profileGender: profile.profileGender,
          profileAge: profile.profileAge,
          profileAddress: profile.profileAddress,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({ type: REQUEST_TO_HOST, profile: profile });
  };
};

export const removeRequest = (profileId) => {
  return { type: REMOVE_REQUEST, profId: profileId };
};
