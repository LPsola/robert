export class Address {
  _id: string;
  city: string;
  street: string;
  areaCode: string;
  country: string;
  latitude: string;
  longitude: string;

  constructor(address?: Partial<Address>) {
    if (address) {
      this._id = address._id!;
      this.city = address.city!;
      this.street = address.street!;
      this.areaCode = address.areaCode!;
      this.country = address.country!;
      this.latitude = address.latitude!;
      this.longitude = address.longitude!;
    }
  }
}
