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

export const EPL_STADIUMS: Stadium[] = [
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
  {
    club: "Leicester City",
    names: ["king power stadium", "king power"],
    locaction: { lat: 52.62040733552879, lng: -1.1421760624687984 },
    league: "EPL",
  },
  {
    club: "liverpool",
    names: ["anfield"],
    locaction: { lat: 53.430833, lng: -2.960833 },
    league: "EPL",
  },
  {
    club: "Manchester City",
    names: ["etihad", "etihad stadium", "city of manchester stadium"],
    locaction: { lat: 53.483056, lng: -2.200278 },
    league: "EPL",
  },
  {
    club: "Manchester United",
    names: ["old trafford", "the theatre of dreams"],
    locaction: { lat: 53.463056, lng: -2.291389 },
    league: "EPL",
  },
  {
    club: "Newcastle United",
    names: ["st james park", "st james' park"],
    locaction: { lat: 54.975556, lng: -1.621667 },
    league: "EPL",
  },
  {
    club: "Nottingham Forest",
    names: ["city ground", "the city ground"],
    locaction: { lat: 52.94, lng: -1.132778 },
    league: "EPL",
  },
  {
    club: "Southampton",
    names: ["st mary's stadium", "st marys stadium", "st mary's", "st marys"],
    locaction: { lat: 50.90588284886436, lng: -1.3911201722318287 },
    league: "EPL",
  },
  {
    club: "Tottenham Hotspur",
    names: ["tottenham hotspur stadium", "new white hart lane"],
    locaction: { lat: 51.604444, lng: -0.066389 },
    league: "EPL",
  },
  {
    club: "west ham united",
    names: ["london stadium", "the london stadium"],
    locaction: { lat: 51.538611, lng: -0.016389 },
    league: "EPL",
  },
  {
    club: "wolverhampton wanderers",
    names: ["molineux", "molineux stadium"],
    locaction: { lat: 52.590278, lng: -2.130278 },
    league: "EPL",
  },
];

export const STADIUMS = [...EPL_STADIUMS];
