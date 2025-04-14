export interface Cats {
  id: number
  name: string
  description: string
  image_url: string
}


export interface Booking {
  id?: number;
  user_id: number;
  package_id: number;
  booking_date: string;
  booking_time: string;
}


export interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
}
