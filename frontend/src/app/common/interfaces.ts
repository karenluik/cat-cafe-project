export interface Cats {
  id: number
  name: string
  description: string
  image_url: string
}


export interface Booking {
  id?: number;
  userId: number;
  packageId: number;
  bookingDate: string; // ISO format date string
  bookingTime: string;
}


export interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
}
