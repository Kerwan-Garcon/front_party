export interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUpdateLocation {
  address: string;
  city: string;
  zipCode: string;
  country: string;
  region: string;
}
