export interface Plankton {
  id: number;
  name: string;
  description: string;
  picture: string;
  localisation: string;
  water_temp: number;
  bloom_period: number;
  created_at: string;
}

export interface DisplayPlanktonProps {
  items: Plankton[];
}
