export interface Location {
  id: number;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  region: string;
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
