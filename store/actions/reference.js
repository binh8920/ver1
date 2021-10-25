import Reference from "../../models/reference";
export const GIVE_REFERENCE = "GIVE_REFERENCE";
export const SET_REFERENCES = "SET_REFERENCES";

export const fetchReferences = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://final-project-ver2-default-rtdb.firebaseio.com/references.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      const loadedReferences = [];

      for (const key in resData) {
        loadedReferences.push(
          new Reference(
            key,
            resData[key].hostPrivateUserId,
            resData[key].guestImage,
            resData[key].guestName,
            resData[key].guestAge,
            resData[key].guestGender,
            resData[key].star,
            resData[key].description
          )
        );
      }
      dispatch({
        type: SET_REFERENCES,
        references: loadedReferences,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const giveReference = (
  hostPrivateUserId,
  guestImage,
  guestName,
  guestAge,
  guestGender,
  star,
  description
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://final-project-ver2-default-rtdb.firebaseio.com/references.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          hostPrivateUserId,
          guestImage,
          guestName,
          guestAge,
          guestGender,
          star,
          description,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: GIVE_REFERENCE,
      referenceData: {
        id: resData.name,
        hostPrivateUserId: hostPrivateUserId,
        guestImage: guestImage,
        guestName: guestName,
        guestAge: guestAge,
        guestGender: guestGender,
        star: star,
        description: description,
      },
    });
  };
};
