export class CareReceiver {
  _id: string;
  orders: string;
  trustedGivers: string;
  spokenLanguage: string;
  emergencyContact: string;
  preferredShoppingPlaces: string[];

  constructor(careReceiver?: Partial<CareReceiver>) {
    if (careReceiver) {
      this._id = careReceiver._id!;
      this.orders = careReceiver.orders!;
      this.trustedGivers = careReceiver.trustedGivers!;
      this.spokenLanguage = careReceiver.spokenLanguage!;
      this.emergencyContact = careReceiver.emergencyContact!;
      this.preferredShoppingPlaces = careReceiver.preferredShoppingPlaces!;
    }
  }
}
