class Request {
  constructor(
    id,
    profileId,
    privateUserId,
    profileName,
    profileGender,
    profileAge,
    profileAddress
  ) {
    (this.id = id),
      (this.profileId = profileId),
      (this.privateUserId = privateUserId),
      (this.profileName = profileName),
      (this.profileGender = profileGender),
      (this.profileAge = profileAge),
      (this.profileAddress = profileAddress);
  }
}

export default Request;
