import playerHoward from "../assets/player-howard.jpg";
import grid1 from "../assets/grid-1.jpg";

export interface PlayerStat {
  label: string;
  value: string;
}

export interface Player {
  id: string;
  number: string;
  first: string;
  last: string;
  position: string;
  positionShort: string;
  height: string;
  from: string;
  /** Cut-out portrait. Absent until the club's shoot lands — the card then
   *  falls back to its numeral treatment over `backdrop`. */
  photo?: string;
  backdrop: string;
  featured?: boolean;
  line: PlayerStat[];
}

export const players: Player[] = [
  {
    id: "howard",
    number: "12",
    first: "Dwight",
    last: "Howard",
    position: "Center",
    positionShort: "C",
    height: "2.11 m",
    from: "Atlanta, USA",
    photo: playerHoward,
    backdrop: grid1,
    featured: true,
    line: [
      { label: "PPG", value: "18.4" },
      { label: "RPG", value: "12.1" },
      { label: "BPG", value: "2.3" },
    ],
  },
];

export type GameStatus = "tickets" | "sold-out" | "broadcast";

export interface Game {
  id: string;
  opponent: string;
  abbr: string;
  competition: string;
  day: string;
  date: string;
  month: string;
  time: string;
  venue: string;
  home: boolean;
  status: GameStatus;
  /** Shown on the next fixture only. */
  next?: boolean;
}

export const games: Game[] = [
  {
    id: "g1",
    opponent: "KSU",
    abbr: "KSU",
    competition: "Superliga",
    day: "Sun",
    date: "04",
    month: "Oct",
    time: "14:00",
    venue: "KSU",
    home: false,
    status: "tickets",
    next: true,
  },
  {
    id: "g2",
    opponent: "TBD",
    abbr: "TBD",
    competition: "Superliga",
    day: "Sat",
    date: "10",
    month: "Oct",
    time: "18:00",
    venue: "The Fortress · Tbilisi Arena",
    home: true,
    status: "tickets",
  },
  {
    id: "g3",
    opponent: "TBD",
    abbr: "TBD",
    competition: "Superliga · New Arena Opener · Car Raffle",
    day: "Sat",
    date: "17",
    month: "Oct",
    time: "18:00",
    venue: "The Fortress · Tbilisi Arena",
    home: true,
    status: "tickets",
  },
  {
    id: "g4",
    opponent: "TBD",
    abbr: "TBD",
    competition: "Superliga",
    day: "Sat",
    date: "24",
    month: "Oct",
    time: "18:00",
    venue: "The Fortress · Tbilisi Arena",
    home: true,
    status: "tickets",
  },
  {
    id: "g5",
    opponent: "Orbi Tkibuli",
    abbr: "ORB",
    competition: "Superliga · Overnight Trip",
    day: "Sun",
    date: "01",
    month: "Nov",
    time: "14:00",
    venue: "Orbi Tkibuli",
    home: false,
    status: "tickets",
  },
  {
    id: "g6",
    opponent: "TBD",
    abbr: "TBD",
    competition: "Superliga",
    day: "Sat",
    date: "07",
    month: "Nov",
    time: "18:00",
    venue: "The Fortress · Tbilisi Arena",
    home: true,
    status: "tickets",
  },
  {
    id: "g7",
    opponent: "Margveti Zestaponi",
    abbr: "MGZ",
    competition: "Superliga · Same-day Trip (TBD)",
    day: "Sun",
    date: "15",
    month: "Nov",
    time: "16:00",
    venue: "Margveti Zestaponi",
    home: false,
    status: "tickets",
  },
  {
    id: "g8",
    opponent: "TBD",
    abbr: "TBD",
    competition: "Superliga · Time TBD",
    day: "Sat",
    date: "12",
    month: "Dec",
    time: "14:00",
    venue: "The Fortress · Tbilisi Arena",
    home: true,
    status: "tickets",
  },
  {
    id: "g9",
    opponent: "Akhaltsikhe/Liberty",
    abbr: "AKH",
    competition: "Superliga · Revenge Game",
    day: "Fri",
    date: "18",
    month: "Dec",
    time: "18:30",
    venue: "Akhaltsikhe/Liberty",
    home: false,
    status: "tickets",
  },
  {
    id: "g10",
    opponent: "Reigning Champions",
    abbr: "CHM",
    competition: "Superliga · Car Raffle II · Pre–New Year",
    day: "Sat",
    date: "26",
    month: "Dec",
    time: "14:00",
    venue: "The Fortress · Tbilisi Arena",
    home: true,
    status: "tickets",
  },
];

export const navLinks = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#about", label: "About", id: "about" },
  { href: "#games", label: "Games", id: "games" },
  { href: "#contact", label: "Contact", id: "contact" },
] as const;

/** Ids the navigation highlights as you scroll. Module-level so the scroll
 *  listener in useScrollSpy is never re-registered on render. */
export const sectionIds: readonly string[] = navLinks.map((link) => link.id);
