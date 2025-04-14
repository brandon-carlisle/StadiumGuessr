import { League, Team } from "./types";

const eflChampionshipTeams: Team[] = [
  {
    code: "BBR",
    clubName: "Blackburn Rovers",
    stadiumNames: ["ewood park"],
    locaction: { lat: 53.728611, lng: -2.489167 },
  },
  {
    code: "BRC",
    clubName: "Bristol City",
    stadiumNames: ["ashton gate stadium", "ashton gate"],
    locaction: { lat: 51.44, lng: -2.620833 },
  },
  {
    code: "BRN",
    clubName: "Burnley",
    stadiumNames: ["turf moor"],
    locaction: { lat: 53.789167, lng: -2.230278 },
  },
  {
    code: "CAR",
    clubName: "Cardiff City",
    stadiumNames: ["cardiff city stadium"],
    locaction: { lat: 51.472778, lng: -3.203056 },
  },
  {
    code: "COV",
    clubName: "Coventry City",
    stadiumNames: ["coventry building society arena", "cbs arena"],
    locaction: { lat: 52.448611, lng: -1.495556 },
  },
  {
    code: "DER",
    clubName: "Derby County",
    stadiumNames: ["pride park stadium"],
    locaction: { lat: 52.915, lng: -1.447222 },
  },
  {
    code: "HUL",
    clubName: "Hull City",
    stadiumNames: ["mkm stadium"],
    locaction: { lat: 53.746111, lng: -0.3675 },
  },
  {
    code: "LEE",
    clubName: "Leeds United",
    stadiumNames: ["elland road"],
    locaction: { lat: 53.7775, lng: -1.572222 },
  },
  {
    code: "LUT",
    clubName: "Luton Town",
    stadiumNames: ["kenilworth road"],
    locaction: { lat: 51.884722, lng: -0.431111 },
  },
  {
    code: "MID",
    clubName: "Middlesbrough",
    stadiumNames: ["riverside stadium"],
    locaction: { lat: 54.578056, lng: -1.216944 },
  },
  {
    code: "MIL",
    clubName: "Millwall",
    stadiumNames: ["the den"],
    locaction: { lat: 51.485, lng: -0.050278 },
  },
  {
    code: "NOR",
    clubName: "Norwich City",
    stadiumNames: ["carrow road"],
    locaction: { lat: 52.622222, lng: 1.309167 },
  },
  {
    code: "OXF",
    clubName: "Oxford United",
    stadiumNames: ["kassam stadium"],
    locaction: { lat: 51.714722, lng: -1.207222 },
  },
  {
    code: "PLY",
    clubName: "Plymouth Argyle",
    stadiumNames: ["home park"],
    locaction: { lat: 50.388056, lng: -4.150833 },
  },
  {
    code: "POR",
    clubName: "Portsmouth",
    stadiumNames: ["fratton park"],
    locaction: { lat: 50.796389, lng: -1.063056 },
  },
  {
    code: "PNE",
    clubName: "Preston North End",
    stadiumNames: ["deepdale"],
    locaction: { lat: 53.772222, lng: -2.688333 },
  },
  {
    code: "QPR",
    clubName: "Queens Park Rangers",
    stadiumNames: ["loftus road"],
    locaction: { lat: 51.509167, lng: -0.232222 },
  },
  {
    code: "SHU",
    clubName: "Sheffield United",
    stadiumNames: ["bramall lane"],
    locaction: { lat: 53.370278, lng: -1.470833 },
  },
  {
    code: "SHW",
    clubName: "Sheffield Wednesday",
    stadiumNames: ["hillsborough stadium", "hillsborough"],
    locaction: { lat: 53.411389, lng: -1.5 },
  },
  {
    code: "STO",
    clubName: "Stoke City",
    stadiumNames: ["bet365 stadium"],
    locaction: { lat: 52.988333, lng: -2.175556 },
  },
  {
    code: "SUN",
    clubName: "Sunderland",
    stadiumNames: ["stadium of light"],
    locaction: { lat: 54.914444, lng: -1.388333 },
  },
  {
    code: "SWA",
    clubName: "Swansea City",
    stadiumNames: ["swansea.com stadium"],
    locaction: { lat: 51.642222, lng: -3.934722 },
  },
  {
    code: "WAT",
    clubName: "Watford",
    stadiumNames: ["vicarage road"],
    locaction: { lat: 51.6498, lng: -0.4015 },
  },
  {
    code: "WBA",
    clubName: "West Bromwich Albion",
    stadiumNames: ["the hawthorns"],
    locaction: { lat: 52.509167, lng: -1.963889 },
  },
];

export const EFL_CHAMPIONSHIP: League = {
  code: "EFL",
  leagueName: "EFL Championship",
  teams: eflChampionshipTeams,
};
