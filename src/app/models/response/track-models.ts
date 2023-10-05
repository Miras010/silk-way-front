import {User} from "../user";

export interface UsersTrack {
  _id: string,
  createdDate: Date,
  description: string,
  ownerId: User,
  track: Track,
}
export interface Track {
  _id: string,
  trackNumber: string,
  createdBy: string,
  createdDate: Date,
  fromChinaToAktobe: Date,
  receivedInAktobeDate: Date,
  shippedFromAktobeDate: Date,
  receivedInChinaDate: Date,
  receivedByClient: Date,
  passedTheBorder: Date
}
