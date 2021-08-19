export const REQUEST_TO_HOST = 'REQUEST_TO_HOST';
export const REMOVE_REQUEST = 'REMOVE_REQUEST';

export const requestToHost = profile => {
    return { type: REQUEST_TO_HOST, profile: profile };
};

export const removeRequest = profileId => {
    return { type: REMOVE_REQUEST, profId: profileId };
};