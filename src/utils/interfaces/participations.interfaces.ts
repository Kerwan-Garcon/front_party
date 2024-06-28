import { User } from "./users.interfaces";

export interface Participations {
  userId: string | undefined;
  eventId: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  paymentStatus: "PENDING" | "PAID" | "NONE";
  user?: User;
}
