export interface User {
  id: number;
  email: string;
  password: string; // Generally, passwords should not be exposed on the client-side
  name: string;
  region: string;
  city: string;
  age: number;
  interests: string[];
  isOrganizer: boolean;
  ratingsGiven?: any[]; // Define more specific types if needed
  ratingsReceived?: any[]; // Define more specific types if needed
  events?: Event[]; // The events organized by this user
  participations?: any[]; // Define more specific types if needed
  messagesSent?: any[]; // Define more specific types if needed
  messagesReceived?: any[]; // Define more specific types if needed
  createdAt: string; // Using string to represent DateTime in ISO format
  updatedAt: string; // Using string to represent DateTime in ISO format
}

export interface CreateUpdateUser {
  email: string;
  password: string;
  name: string;
  region: string;
  city: string;
  age: number;
  interests: string[];
  isOrganizer: boolean;
}

export interface UserQueries {
  data: User[];
  error?: string;
  page?: number;
  total?: number;
  statusCode?: number;
  limit?: number;
}
