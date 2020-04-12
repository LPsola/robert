export class Address {
  city: string;
  street: string;
  streetNumber: string;
  country: string;
  latitude: string;
  longitude: string;

  constructor(address?: Partial<Address>) {
    if (address) {
      this.city = address.city!;
      this.street = address.street!;
      this.streetNumber = address.streetNumber!;
      this.country = address.country!;
      this.latitude = address.latitude!;
      this.longitude = address.longitude!;
    }
  }
}
