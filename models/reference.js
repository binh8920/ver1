class Reference {
  constructor(
    id,
    hostPrivateUserId,
    guestImage,
    guestName,
    guestAge,
    guestGender,
    star,
    description
  ) {
    (this.id = id),
      (this.hostPrivateUserId = hostPrivateUserId),
      (this.guestImage = guestImage),
      (this.guestName = guestName),
      (this.guestAge = guestAge),
      (this.guestGender = guestGender),
      (this.star = star),
      (this.description = description);
  }
}

export default Reference;
