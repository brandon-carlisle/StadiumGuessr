interface Stadium {
  club: string;
  names: string[];
  locaction: Locaction;
  league: League;
}

interface Locaction {
  lat: number;
  lng: number;
}

type League = "EPL";

const EPL_STADIUMS: Stadium[] = [
  {
    club: "Arsenal",
    names: [
      "emirates stadium",
      "emirates",
      "the emirates",
      "the emirates stadium",
    ],
    locaction: { lat: 51.556667, lng: -0.106111 },
    league: "EPL",
  },
  {
    club: "Aston Villa",
    names: ["villa park"],
    locaction: { lat: 52.509167, lng: -1.884722 },
    league: "EPL",
  },
  {
    club: "Bournemouth",
    names: ["vitality stadium", "dean court"],
    locaction: { lat: 50.735278, lng: -1.838333 },
    league: "EPL",
  },
  {
    club: "Brentford",
    names: [
      "gtech",
      "gtech community stadium",
      "gtech stadium",
      "brentford community stadium",
    ],
    locaction: { lat: 51.490825, lng: -0.2887 },
    league: "EPL",
  },
  {
    club: "Brighton & Hove Albion",
    names: [
      "amex",
      "amex stadium",
      "amex community stadium",
      "american express stadium",
      "american express community stadium",
      "falmer stadium",
    ],
    locaction: { lat: 50.861822, lng: -0.083278 },
    league: "EPL",
  },
  {
    club: "Chelsea",
    names: ["stamford bridge"],
    locaction: { lat: 51.481667, lng: -0.191111 },
    league: "EPL",
  },
  {
    club: "Crystal Palace",
    names: ["selhurst park"],
    locaction: { lat: 51.398333, lng: -0.085556 },
    league: "EPL",
  },
  {
    club: "Everton",
    names: ["goodison park", "goodison"],
    locaction: { lat: 53.438889, lng: -2.966389 },
    league: "EPL",
  },
  {
    club: "Fulham",
    names: ["craven cottage"],
    locaction: { lat: 51.475, lng: -0.221667 },
    league: "EPL",
  },
  {
    club: "Ipswich Town",
    names: ["portman road", "portman road stadium"],
    locaction: { lat: 52.055, lng: 1.144722 },
    league: "EPL",
  },
];

export const STADIUMS = [...EPL_STADIUMS];
