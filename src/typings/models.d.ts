interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  location: LatLong;
}

interface LatLong {
  latitude: number;
  longitude: number;
}
