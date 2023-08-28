const constants = {
  ID_PREFIX: "institution:listing:",
  CITY_KEY: "cities",
  PROVINCES_TERRITORIES_KEY: "provinces-territories",
  REDIS_INDEX: "idx:institutions",
  CITIES_ROUTE: "/cities",
  PROVINCES_TERRITORIES_ROUTE: "/provinces_territories",
  CREATE_INSTITUTION_ROUTE: "/institution",
  REMOVE_INSTITUTION_ROUTE: "/institution/:id",
  UPDATE_INSTITUTION_ROUTE: "/institution/:id",
  GET_INSTITUTIONS_ROUTE: "/institution/search",
  PROVINCES_TERRITORIES: [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Northwest Territories",
    "Nunavut",
    "Yukon",
  ],
};

export default constants;
