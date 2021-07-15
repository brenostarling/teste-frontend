export interface Vehicle {
  id: number;
  name: string;
  accessibility: boolean;
  path: number | null;
  arrival?: string;
  position: {
    lat: number;
    long: number;
  };
}

export interface Stop {
  id: number;
  name: string;
  address: string;
  position: {
    lat: number;
    long: number;
  };
}
