import PropTypes from "prop-types";
class Profile {
  constructor(
    id,
    privateId,
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
    sleepingArrangement
  ) {
    (this.id = id),
      (this.privateId = privateId),
      (this.name = name),
      (this.age = age),
      (this.gender = gender),
      (this.imgURL = imgURL),
      (this.couchStatus = couchStatus),
      (this.visitedCountries = visitedCountries),
      (this.languages = languages),
      (this.occupation = occupation),
      (this.education = education),
      (this.hometown = hometown),
      (this.interest = interest),
      (this.reasonForCS = reasonForCS),
      (this.hostOffer = hostOffer),
      (this.address = address),
      (this.maxGuest = maxGuest),
      (this.sleepingArrangement = sleepingArrangement);
  }
}

Profile.PropTypes = {
  interest: PropTypes.string,
};

export default Profile;
