import Acceptance from "../../models/acceptance";
export const ACCEPT_USER = "ACCEPT_USER";
export const SET_ACCEPTANCES = "SET_ACCEPTANCES";

export const fetchAcceptances = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://final-project-ver2-default-rtdb.firebaseio.com/acceptances/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      const loadedAcceptances = [];

      for (const key in resData) {
        loadedAcceptances.push(
          new Acceptance(
            key,
            resData[key].requestId,
            resData[key].requestName,
            resData[key].requestAge,
            resData[key].requestGender,
            resData[key].totalRequest,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({
        type: SET_ACCEPTANCES,
        acceptances: loadedAcceptances,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const acceptUser = (
  requestId,
  requestName,
  requestAge,
  requestGender,
  totalRequest,
  guestPushToken
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();

    const response = await fetch(
      `https://final-project-ver2-default-rtdb.firebaseio.com/acceptances/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          requestId,
          requestName,
          requestAge,
          requestGender,
          totalRequest,
          date: date.toISOString(),
        }),
      }
    );

    await fetch(
      `https://final-project-ver2-default-rtdb.firebaseio.com/requests/${requestId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({
      type: ACCEPT_USER,
      acceptData: {
        id: resData.name,
        requestId: requestId,
        requestName: requestName,
        requestAge: requestAge,
        requestGender: requestGender,
        totalRequest: totalRequest,
        date: date,
      },
      requestId: requestId,
    });

    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: guestPushToken,
        title: `You are accepted`,
        body: date.toISOString(),
      }),
    });
  };
};
