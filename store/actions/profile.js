export const CREATE_PROFILE = 'CREATE_PROFILE';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';

export const deleteProfile = profileId => {
    return {
        type: DELETE_PROFILE, pid: profileId
    };
};

export const createProfile = (
    name,
    age,
    gender,
    imgURL,
    couchStatus,
    visitedCountries,
    languages,
    occupation,
    education,
    hometown,
    interest,
    reasonForCS,
    hostOffer,
    address,
    maxGuest,
    sleepingArrangement,
    references
) => {
    return {
        type: CREATE_PROFILE,
        profileData: {
            name,
            age,
            gender,
            imgURL,
            couchStatus,
            visitedCountries,
            languages,
            occupation,
            education,
            hometown,
            interest,
            reasonForCS,
            hostOffer,
            address,
            maxGuest,
            sleepingArrangement,
            references
        }
    };
};

export const editProfile = (
    id,
    name,
    age,
    gender,
    imgURL,
    couchStatus,
    visitedCountries,
    languages,
    occupation,
    education,
    hometown,
    interest,
    reasonForCS,
    hostOffer,
    address,
    maxGuest,
    sleepingArrangement,
    isParents,
    isPetLover,
    isSmoker,
    references
) => {
    return {
        type: EDIT_PROFILE,
        pid: id,
        profileData: {
            name,
            age,
            gender,
            imgURL,
            couchStatus,
            visitedCountries,
            languages,
            occupation,
            education,
            hometown,
            interest,
            reasonForCS,
            hostOffer,
            address,
            maxGuest,
            sleepingArrangement,
            isParents,
            isPetLover,
            isSmoker,
            references
        }
    };
};