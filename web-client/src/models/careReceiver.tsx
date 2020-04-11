import {Vulnerability} from "./vulnerability";

export class CareReceiver {
  orders: string;
  trustedGivers: string;
  spokenLanguage: string;
  emergencyContact: string;
  preferredShoppingPlaces: string[];
  vulnerability: Vulnerability;

  constructor(careReceiver?: Partial<CareReceiver>) {
    if (careReceiver) {
      this.orders = careReceiver.orders!;
      this.trustedGivers = careReceiver.trustedGivers!;
      this.spokenLanguage = careReceiver.spokenLanguage!;
      this.emergencyContact = careReceiver.emergencyContact!;
      this.preferredShoppingPlaces = careReceiver.preferredShoppingPlaces!;
      this.vulnerability = careReceiver.vulnerability!;
    }
  }
}
