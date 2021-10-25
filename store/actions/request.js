import Request from "../../models/request";

export const REQUEST_TO_HOST = "REQUEST_TO_HOST";
export const REMOVE_REQUEST = "REMOVE_REQUEST";
export const SET_REQUEST = "SET_REQUEST";

export const fetchRequest = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://final-project-ver2-default-rtdb.firebaseio.com/requests.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      console.log(resData);

      const loadedRequests = [];

      for (const key in resData) {
        if (resData[key].hostPrivateUserId === userId) {
          loadedRequests.push(
            new Request(
              key,
              resData[key].hostPrivateUserId,
              resData[key].profileName,
              resData[key].profileGender,
              resData[key].profileAge,
              resData[key].guestPushToken
            )
          );
        }
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

export const requestToHost = (
  hostPrivateUserId,
  profileName,
  profileGender,
  profileAge,
  guestPushToken
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://final-project-ver2-default-rtdb.firebaseio.com/requests.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          hostPrivateUserId,
          profileName,
          profileGender,
          profileAge,
          guestPushToken,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: REQUEST_TO_HOST,
      requestData: {
        id: resData.name,
        hostPrivateId: hostPrivateUserId,
        profName: profileName,
        profGender: profileGender,
        profAge: profileAge,
        guestPushToken: guestPushToken,
      },
    });
  };
};

export const removeRequest = (requestId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await fetch(
      `https://final-project-ver2-default-rtdb.firebaseio.com/requests/${requestId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    dispatch({
      type: REMOVE_REQUEST,
      requestId: requestId,
    });
  };
};
