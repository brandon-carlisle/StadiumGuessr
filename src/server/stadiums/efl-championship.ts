import type { League, StadiumLocal } from "./";

const eflChampionshipTeams: StadiumLocal[] = [
  {
    code: "BBR",
    club: "Blackburn Rovers",
    names: ["ewood park"],
    locaction: { lat: 53.728611, lng: -2.489167 },
  },
  {
    code: "BRC",
    club: "Bristol City",
    names: ["ashton gate stadium", "ashton gate"],
    locaction: { lat: 51.44, lng: -2.620833 },
  },
  {
    code: "BRN",
    club: "Burnley",
    names: ["turf moor"],
    locaction: { lat: 53.789167, lng: -2.230278 },
  },
  {
    code: "CAR",
    club: "Cardiff City",
    names: ["cardiff city stadium"],
    locaction: { lat: 51.472778, lng: -3.203056 },
  },
  {
    code: "COV",
    club: "Coventry City",
    names: ["coventry building society arena", "cbs arena"],
    locaction: { lat: 52.448611, lng: -1.495556 },
  },
  {
    code: "DER",
    club: "Derby County",
    names: ["pride park stadium"],
    locaction: { lat: 52.915, lng: -1.447222 },
  },
  {
    code: "HUL",
    club: "Hull City",
    names: ["mkm stadium"],
    locaction: { lat: 53.746111, lng: -0.3675 },
  },
  {
    code: "LEE",
    club: "Leeds United",
    names: ["elland road"],
    locaction: { lat: 53.7775, lng: -1.572222 },
  },
  {
    code: "LUT",
    club: "Luton Town",
    names: ["kenilworth road"],
    locaction: { lat: 51.884722, lng: -0.431111 },
  },
  {
    code: "MID",
    club: "Middlesbrough",
    names: ["riverside stadium"],
    locaction: { lat: 54.578056, lng: -1.216944 },
  },
  {
    code: "MIL",
    club: "Millwall",
    names: ["the den"],
    locaction: { lat: 51.485, lng: -0.050278 },
  },
  {
    code: "NOR",
    club: "Norwich City",
    names: ["carrow road"],
    locaction: { lat: 52.622222, lng: 1.309167 },
  },
  {
    code: "OXF",
    club: "Oxford United",
    names: ["kassam stadium"],
    locaction: { lat: 51.714722, lng: -1.207222 },
  },
  {
    code: "PLY",
    club: "Plymouth Argyle",
    names: ["home park"],
    locaction: { lat: 50.388056, lng: -4.150833 },
  },
  {
    code: "POR",
    club: "Portsmouth",
    names: ["fratton park"],
    locaction: { lat: 50.796389, lng: -1.063056 },
  },
  {
    code: "PNE",
    club: "Preston North End",
    names: ["deepdale"],
    locaction: { lat: 53.772222, lng: -2.688333 },
  },
  {
    code: "QPR",
    club: "Queens Park Rangers",
    names: ["loftus road"],
    locaction: { lat: 51.509167, lng: -0.232222 },
  },
  {
    code: "SHU",
    club: "Sheffield United",
    names: ["bramall lane"],
    locaction: { lat: 53.370278, lng: -1.470833 },
  },
  {
    code: "SHW",
    club: "Sheffield Wednesday",
    names: ["hillsborough stadium"],
    locaction: { lat: 53.411389, lng: -1.5 },
  },
  {
    code: "STO",
    club: "Stoke City",
    names: ["bet365 stadium"],
    locaction: { lat: 52.988333, lng: -2.175556 },
  },
  {
    code: "SUN",
    club: "Sunderland",
    names: ["stadium of light"],
    locaction: { lat: 54.914444, lng: -1.388333 },
  },
  {
    code: "SWA",
    club: "Swansea City",
    names: ["swansea.com stadium"],
    locaction: { lat: 51.642222, lng: -3.934722 },
  },
  {
    code: "WAT",
    club: "Watford",
    names: ["vicarage road"],
    locaction: { lat: 51.6498, lng: -0.4015 },
  },
  {
    code: "WBA",
    club: "West Bromwich Albion",
    names: ["the hawthorns"],
    locaction: { lat: 52.509167, lng: -1.963889 },
  },
];

export const EFL_CHAMPIONSHIP: League = {
  code: "EFL_CHAMPIONSHIP",
  leagueName: "EFL Championship",
  teams: eflChampionshipTeams,
};
