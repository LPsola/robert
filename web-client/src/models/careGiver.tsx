import {CareReceiver} from "./careReceiver";

export class CareGiver {
  receiversServed: CareReceiver[];
  favoriteReceivers: CareReceiver[];
  piggyBank: number;
  spokenLanguages: string[];
  profileImage: string;

  constructor(careGiver?: Partial<CareGiver>) {
    if (careGiver) {
      this.receiversServed = careGiver.receiversServed!;
      this.favoriteReceivers = careGiver.favoriteReceivers!;
      this.piggyBank = careGiver.piggyBank!;
      this.spokenLanguages = careGiver.spokenLanguages!;
      this.profileImage = careGiver.profileImage!;
    }
  }
}
