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
            resData[key].requests,
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

export const acceptUser = (requestedProfile, totalRequest) => {
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
          requestedProfile,
          totalRequest,
          date: date.toISOString(),
        }),
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
        requests: requestedProfile,
        amount: totalRequest,
        date: date,
      },
    });
  };
};
