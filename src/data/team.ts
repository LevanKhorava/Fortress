import playerHoward from '../assets/player-howard.jpg'
import grid1 from '../assets/grid-1.jpg'
import grid2 from '../assets/grid-2.jpg'
import grid3 from '../assets/grid-3.jpg'
import grid4 from '../assets/grid-4.jpg'
import grid5 from '../assets/grid-5.jpg'
import grid6 from '../assets/grid-6.jpg'

export interface PlayerStat {
  label: string
  value: string
}

export interface Player {
  id: string
  number: string
  first: string
  last: string
  position: string
  positionShort: string
  height: string
  from: string
  /** Cut-out portrait. Absent until the club's shoot lands — the card then
   *  falls back to its numeral treatment over `backdrop`. */
  photo?: string
  backdrop: string
  featured?: boolean
  line: PlayerStat[]
}

export const players: Player[] = [
  {
    id: 'howard',
    number: '12',
    first: 'Dwight',
    last: 'Howard',
    position: 'Center',
    positionShort: 'C',
    height: '2.11 m',
    from: 'Atlanta, USA',
    photo: playerHoward,
    backdrop: grid1,
    featured: true,
    line: [
      { label: 'PPG', value: '18.4' },
      { label: 'RPG', value: '12.1' },
      { label: 'BPG', value: '2.3' },
    ],
  },
  {
    id: 'beridze',
    number: '07',
    first: 'Giorgi',
    last: 'Beridze',
    position: 'Point Guard',
    positionShort: 'PG',
    height: '1.88 m',
    from: 'Tbilisi, GEO',
    backdrop: grid2,
    line: [
      { label: 'PPG', value: '15.2' },
      { label: 'APG', value: '8.6' },
      { label: 'SPG', value: '1.9' },
    ],
  },
  {
    id: 'matiashvili',
    number: '23',
    first: 'Luka',
    last: 'Matiashvili',
    position: 'Shooting Guard',
    positionShort: 'SG',
    height: '1.96 m',
    from: 'Batumi, GEO',
    backdrop: grid3,
    line: [
      { label: 'PPG', value: '21.7' },
      { label: '3P%', value: '41.3' },
      { label: 'MPG', value: '33.8' },
    ],
  },
  {
    id: 'chikovani',
    number: '04',
    first: 'Nika',
    last: 'Chikovani',
    position: 'Small Forward',
    positionShort: 'SF',
    height: '2.01 m',
    from: 'Kutaisi, GEO',
    backdrop: grid4,
    line: [
      { label: 'PPG', value: '13.9' },
      { label: 'RPG', value: '6.4' },
      { label: 'SPG', value: '1.4' },
    ],
  },
  {
    id: 'abuladze',
    number: '31',
    first: 'Sandro',
    last: 'Abuladze',
    position: 'Power Forward',
    positionShort: 'PF',
    height: '2.06 m',
    from: 'Rustavi, GEO',
    backdrop: grid5,
    line: [
      { label: 'PPG', value: '16.8' },
      { label: 'RPG', value: '9.2' },
      { label: 'FG%', value: '54.6' },
    ],
  },
  {
    id: 'goguadze',
    number: '88',
    first: 'Irakli',
    last: 'Goguadze',
    position: 'Combo Guard',
    positionShort: 'G',
    height: '1.91 m',
    from: 'Gori, GEO',
    backdrop: grid6,
    line: [
      { label: 'PPG', value: '11.5' },
      { label: 'APG', value: '5.1' },
      { label: '3P%', value: '38.9' },
    ],
  },
]

export type GameStatus = 'tickets' | 'sold-out' | 'broadcast'

export interface Game {
  id: string
  opponent: string
  abbr: string
  competition: string
  day: string
  date: string
  month: string
  time: string
  venue: string
  home: boolean
  status: GameStatus
  /** Shown on the next fixture only. */
  next?: boolean
}

export const games: Game[] = [
  {
    id: 'g1',
    opponent: 'Iberia Kings',
    abbr: 'IBK',
    competition: 'Superliga · Round 12',
    day: 'Sat',
    date: '04',
    month: 'Oct',
    time: '20:00',
    venue: 'The Fortress · Tbilisi Arena',
    home: true,
    status: 'tickets',
    next: true,
  },
  {
    id: 'g2',
    opponent: 'Rioni Storm',
    abbr: 'RIO',
    competition: 'Superliga · Round 13',
    day: 'Wed',
    date: '08',
    month: 'Oct',
    time: '19:30',
    venue: 'Rioni Dome · Kutaisi',
    home: false,
    status: 'broadcast',
  },
  {
    id: 'g3',
    opponent: 'Caucasus Titans',
    abbr: 'CAU',
    competition: 'Continental Cup · Group B',
    day: 'Sun',
    date: '12',
    month: 'Oct',
    time: '21:00',
    venue: 'The Fortress · Tbilisi Arena',
    home: true,
    status: 'sold-out',
  },
  {
    id: 'g4',
    opponent: 'Black Sea United',
    abbr: 'BSU',
    competition: 'Superliga · Round 14',
    day: 'Fri',
    date: '17',
    month: 'Oct',
    time: '20:30',
    venue: 'Harbour Hall · Batumi',
    home: false,
    status: 'tickets',
  },
  {
    id: 'g5',
    opponent: 'Alazani Wolves',
    abbr: 'ALZ',
    competition: 'Superliga · Round 15',
    day: 'Tue',
    date: '21',
    month: 'Oct',
    time: '20:00',
    venue: 'The Fortress · Tbilisi Arena',
    home: true,
    status: 'tickets',
  },
]

export interface Counter {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  label: string
  note: string
}

/** Headline counters under the About section. */
export const clubCounters: Counter[] = [
  { value: 412, label: 'Wins', note: 'Since the club was founded in 2009' },
  { value: 7, label: 'Championships', note: 'Five domestic, two continental' },
  { value: 16, label: 'Players', note: 'First-team roster, 2025/26' },
  { value: 24, suffix: '–3', label: 'Season Record', note: 'Best start in club history' },
]

export interface Metric {
  label: string
  value: number
  suffix?: string
  decimals?: number
  /** 0..100 — how full the meter reads. */
  fill: number
  rank: string
}

/** Performance meters in the Statistics section. */
export const seasonMetrics: Metric[] = [
  { label: 'Points per game', value: 104.6, decimals: 1, fill: 92, rank: '1st in league' },
  { label: 'Field goal %', value: 49.8, decimals: 1, suffix: '%', fill: 83, rank: '2nd in league' },
  { label: 'Three point %', value: 38.4, decimals: 1, suffix: '%', fill: 76, rank: '3rd in league' },
  { label: 'Rebounds per game', value: 47.2, decimals: 1, fill: 88, rank: '1st in league' },
  { label: 'Assists per game', value: 26.1, decimals: 1, fill: 81, rank: '2nd in league' },
  { label: 'Home win rate', value: 94, suffix: '%', fill: 94, rank: 'Unbeaten in 14' },
]

export const navLinks = [
  { href: '#home', label: 'Home', id: 'home' },
  { href: '#team', label: 'Team', id: 'team' },
  { href: '#games', label: 'Games', id: 'games' },
  { href: '#stats', label: 'Stats', id: 'stats' },
  { href: '#contact', label: 'Contact', id: 'contact' },
] as const

/** Ids the navigation highlights as you scroll. Module-level so the scroll
 *  listener in useScrollSpy is never re-registered on render. */
export const sectionIds: readonly string[] = navLinks.map((link) => link.id)
