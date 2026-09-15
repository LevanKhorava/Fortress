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
    competition: "Superleague · ",
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
    opponent: "Iverioni",
    abbr: "IVR",
    competition: "Superleague · ",
    day: "Sat",
    date: "10",
    month: "Oct",
    time: "18:00",
    venue: "Tbilisi Arena",
    home: true,
    status: "tickets",
  },
  {
    id: "g3",
    opponent: "TSU",
    abbr: "TSU",
    competition: "Superleague ·",
    day: "Sat",
    date: "17",
    month: "Oct",
    time: "18:00",
    venue: "Tbilisi Arena",
    home: false,
    status: "tickets",
  },
  {
    id: "g4",
    opponent: "Telavi",
    abbr: "TEL",
    competition: "Superleague ·",
    day: "Sat",
    date: "24",
    month: "Oct",
    time: "18:00",
    venue: "Old Sports Palace.",
    home: true,
    status: "tickets",
  },
  {
    id: "g5",
    opponent: "Orbi",
    abbr: "ORB",
    competition: "Superleague ·",
    day: "Sun",
    date: "01",
    month: "Nov",
    time: "14:00",
    venue: "Tkibuli",
    home: false,
    status: "tickets",
  },
  {
    id: "g6",
    opponent: "Rustavi",
    abbr: "RUS",
    competition: "Superleague ·",
    day: "Sat",
    date: "07",
    month: "Nov",
    time: "18:00",
    venue: "Tbilisi Arena",
    home: true,
    status: "tickets",
  },
  {
    id: "g7",
    opponent: "Margveti",
    abbr: "MGZ",
    competition: "Superleague ·",
    day: "Sun",
    date: "15",
    month: "Nov",
    time: "16:00",
    venue: "Zestafoni",
    home: false,
    status: "tickets",
  },
  {
    id: "g8",
    opponent: "Kutaisi",
    abbr: "KUT",
    competition: "Superleague ·",
    day: "Sat",
    date: "12",
    month: "Dec",
    time: "14:00",
    venue: "Tbilisi Arena",
    home: true,
    status: "tickets",
  },
  {
    id: "g9",
    opponent: "Akhaltsikhe",
    abbr: "AKH",
    competition: "Superleague ·",
    day: "Fri",
    date: "18",
    month: "Dec",
    time: "18:30",
    venue: "Akhaltsikhe",
    home: false,
    status: "tickets",
  },
  {
    id: "g10",
    opponent: "Batumi",
    abbr: "BAT",
    competition: "Superleague ·",
    day: "Sat",
    date: "26",
    month: "Dec",
    time: "14:00",
    venue: "Tbilisi Arena",
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
