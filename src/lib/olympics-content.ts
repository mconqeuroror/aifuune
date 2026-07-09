import { assetUrl } from "./asset-base";

export type LeaderboardEntry = {
  rank: number;
  name: string;
  performance: string;
  place: string;
  medal: "gold" | "silver" | "bronze" | "";
  avatar: string;
};

export const OLYMPICS_MONTH = "July 2026 Leaderboard";
export const OLYMPICS_PREV_MONTH = "June 2026";
export const OLYMPICS_LAST_UPDATED = "34 minutes ago";

export const JULY_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Lily",
    performance: "$12,170",
    place: "Gold",
    medal: "gold",
    avatar: assetUrl("/images/olympics/avatars/lb-2.webp"),
  },
  {
    rank: 2,
    name: "Sandra",
    performance: "$3,421",
    place: "Silver",
    medal: "silver",
    avatar: assetUrl("/images/olympics/avatars/lb-4.webp"),
  },
  {
    rank: 3,
    name: "Lara",
    performance: "$3,133",
    place: "Bronze",
    medal: "bronze",
    avatar: assetUrl("/images/olympics/avatars/lb-3.webp"),
  },
  {
    rank: 4,
    name: "Cassie",
    performance: "$1,914",
    place: "4th",
    medal: "",
    avatar: assetUrl("/images/olympics/avatars/lb-5.webp"),
  },
  {
    rank: 5,
    name: "lilly",
    performance: "$1,815",
    place: "5th",
    medal: "",
    avatar: assetUrl("/images/olympics/avatars/lb-6.webp"),
  },
  {
    rank: 6,
    name: "Ella",
    performance: "$964",
    place: "6th",
    medal: "",
    avatar: assetUrl("/images/olympics/avatars/lb-7.webp"),
  },
  {
    rank: 7,
    name: "Nika",
    performance: "$758",
    place: "7th",
    medal: "",
    avatar: assetUrl("/images/olympics/avatars/lb-8.webp"),
  },
  {
    rank: 8,
    name: "sohee",
    performance: "$748",
    place: "8th",
    medal: "",
    avatar: assetUrl("/images/olympics/avatars/lb-9.webp"),
  },
  {
    rank: 9,
    name: "Riki",
    performance: "$618",
    place: "9th",
    medal: "",
    avatar: assetUrl("/images/olympics/avatars/lb-10.webp"),
  },
  {
    rank: 10,
    name: "Lena",
    performance: "$475",
    place: "10th",
    medal: "",
    avatar: assetUrl("/images/olympics/avatars/lb-11.webp"),
  },
];

export const JUNE_TOP_3 = [
  {
    name: "Lily",
    amount: "$22,096",
    avatar: assetUrl("/images/olympics/avatars/lb-2.webp"),
  },
  {
    name: "Lara",
    amount: "$7,919",
    avatar: assetUrl("/images/olympics/avatars/lb-3.webp"),
  },
  {
    name: "Sandra",
    amount: "$4,484",
    avatar: assetUrl("/images/olympics/avatars/lb-4.webp"),
  },
] as const;

export const HALL_OF_FAME = [
  {
    name: "Lily",
    wins: "3x",
    avatar: assetUrl("/images/olympics/avatars/lb-12.webp"),
  },
  {
    name: "Aria",
    wins: "1x",
    avatar: assetUrl("/images/olympics/avatars/lb-13.webp"),
  },
  {
    name: "Rebecca",
    wins: "1x",
    avatar: assetUrl("/images/olympics/avatars/lb-14.webp"),
  },
] as const;
