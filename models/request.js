class Request {
  constructor(
    id,
    hostPrivateUserId,
    profileName,
    profileGender,
    profileAge,
    guestPushToken
  ) {
    (this.id = id),
      (this.hostPrivateUserId = hostPrivateUserId),
      (this.profileName = profileName),
      (this.profileGender = profileGender),
      (this.profileAge = profileAge),
      (this.guestPushToken = guestPushToken);
  }
}

export default Request;
