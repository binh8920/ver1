export const ACCEPT_USER = 'ACCEPT_USER';

export const acceptUser = (requestedProfile, totalRequest) => {
    return {
        type: ACCEPT_USER,
        acceptData: { requests: requestedProfile, amount: totalRequest }
    };
};