import { League, Team } from "./types";

const eplTeams: Team[] = [
  {
    code: "ARS",
    clubName: "Arsenal",
    stadiumNames: [
      "emirates stadium",
      "emirates",
      "the emirates",
      "the emirates stadium",
    ],
    locaction: { lat: 51.556667, lng: -0.106111 },
  },
  {
    code: "AVL",
    clubName: "Aston Villa",
    stadiumNames: ["villa park"],
    locaction: { lat: 52.509167, lng: -1.884722 },
  },
  {
    code: "BOU",
    clubName: "Bournemouth",
    stadiumNames: ["vitality stadium", "dean court"],
    locaction: { lat: 50.735278, lng: -1.838333 },
  },
  {
    code: "BRE",
    clubName: "Brentford",
    stadiumNames: [
      "gtech",
      "gtech community stadium",
      "gtech stadium",
      "brentford community stadium",
    ],
    locaction: { lat: 51.490825, lng: -0.2887 },
  },
  {
    code: "BHA",
    clubName: "Brighton & Hove Albion",
    stadiumNames: [
      "amex",
      "amex stadium",
      "amex community stadium",
      "american express stadium",
      "american express community stadium",
      "falmer stadium",
    ],
    locaction: { lat: 50.861822, lng: -0.083278 },
  },
  {
    code: "CHE",
    clubName: "Chelsea",
    stadiumNames: ["stamford bridge"],
    locaction: { lat: 51.481667, lng: -0.191111 },
  },
  {
    code: "CRY",
    clubName: "Crystal Palace",
    stadiumNames: ["selhurst park"],
    locaction: { lat: 51.398333, lng: -0.085556 },
  },
  {
    code: "EVE",
    clubName: "Everton",
    stadiumNames: ["goodison park", "goodison"],
    locaction: { lat: 53.438889, lng: -2.966389 },
  },
  {
    code: "FUL",
    clubName: "Fulham",
    stadiumNames: ["craven cottage"],
    locaction: { lat: 51.475, lng: -0.221667 },
  },
  {
    code: "IPS",
    clubName: "Ipswich Town",
    stadiumNames: ["portman road", "portman road stadium"],
    locaction: { lat: 52.055, lng: 1.144722 },
  },
  {
    code: "LEI",
    clubName: "Leicester City",
    stadiumNames: ["king power stadium", "king power"],
    locaction: { lat: 52.62040733552879, lng: -1.1421760624687984 },
  },
  {
    code: "LIV",
    clubName: "Liverpool",
    stadiumNames: ["anfield"],
    locaction: { lat: 53.430833, lng: -2.960833 },
  },
  {
    code: "MCI",
    clubName: "Manchester City",
    stadiumNames: ["etihad", "etihad stadium", "city of manchester stadium"],
    locaction: { lat: 53.483056, lng: -2.200278 },
  },
  {
    code: "MUN",
    clubName: "Manchester United",
    stadiumNames: ["old trafford", "the theatre of dreams"],
    locaction: { lat: 53.463056, lng: -2.291389 },
  },
  {
    code: "NEW",
    clubName: "Newcastle United",
    stadiumNames: ["st james park", "st james' park"],
    locaction: { lat: 54.975556, lng: -1.621667 },
  },
  {
    code: "NFO",
    clubName: "Nottingham Forest",
    stadiumNames: ["city ground", "the city ground"],
    locaction: { lat: 52.94, lng: -1.132778 },
  },
  {
    code: "SOU",
    clubName: "Southampton",
    stadiumNames: [
      "st mary's stadium",
      "st marys stadium",
      "st mary's",
      "st marys",
    ],
    locaction: { lat: 50.90588284886436, lng: -1.3911201722318287 },
  },
  {
    code: "TOT",
    clubName: "Tottenham Hotspur",
    stadiumNames: ["tottenham hotspur stadium", "new white hart lane"],
    locaction: { lat: 51.604444, lng: -0.066389 },
  },
  {
    code: "WHU",
    clubName: "West Ham United",
    stadiumNames: ["london stadium", "the london stadium"],
    locaction: { lat: 51.538611, lng: -0.016389 },
  },
  {
    code: "WOL",
    clubName: "Wolverhampton Wanderers",
    stadiumNames: ["molineux", "molineux stadium"],
    locaction: { lat: 52.590278, lng: -2.130278 },
  },
];

export const EPL: League = {
  code: "EPL",
  leagueName: "Premier League",
  teams: eplTeams,
};
