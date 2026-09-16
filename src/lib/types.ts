export type DayStatus = "pending" | "green" | "red";

export type LeverageDay = {
  day: number;
  date: string;
  targetBank: number;
  status: DayStatus;
};

export type HubConfig = {
  id: string;
  slug: string;
  name: string;
  initialBank: number;
  targetOdd: number;
  participants: number;
  startDate: string;
  endDate: string;
  createdAt: string;
};

export type Hub = HubConfig & {
  days: LeverageDay[];
};

export type CreateHubInput = {
  name: string;
  initialBank: number;
  targetOdd: number;
  participants: number;
  endDate: string;
};
