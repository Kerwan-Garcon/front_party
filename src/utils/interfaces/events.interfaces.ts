import { Location } from "./locations.interface";
import { User } from "./users.interfaces";

export interface Event {
  id: number;
  name: string;
  type: EventType;
  date: Date;
  time: Date;
  remainingSpots: number;
  description: string;
  isPaid: boolean;
  price?: number;
  isPublished: boolean;
  bringDrinks: boolean;
  bringGames: boolean;
  bringEquipment: boolean;
  equipmentDetails?: string;
  organizerId: number;
  organizer: User;
  games: Game[];
  location: Location;
  participants: any[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Game {
  id: number;
  name: string;
  eventId: number;
}

export enum EventType {
  PARTY = "PARTY",
  BOARD_GAME = "BOARD_GAME",
  VIDEO_GAME = "VIDEO_GAME",
}

export interface CreateUpdateEvent {
  name: string;
  location: string;
  type: EventType;
  date: string;
  time: string;
  remainingSpots: number;
  description: string;
  isPaid: boolean;
  price?: number;
  isPublished: boolean;
  bringDrinks: boolean;
  bringGames: boolean;
  bringEquipment: boolean;
  equipmentDetails?: string;
  organizerId: number;
  games: { name: string }[];
}

export interface EventQueries {
  data?: Event[];
  error?: string;
  page?: number;
  total?: number;
  statusCode?: number;
  limit?: number;
}