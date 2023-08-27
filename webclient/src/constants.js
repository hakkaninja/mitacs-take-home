export const DropdownTypes = Object.freeze({
  City: "City",
  "Province/Territory": "Province/Territory",
});

export const ModalActions = Object.freeze({
  UPDATE: "Update",
  ADD: "ADD",
});

export const constants = {
  DEBOUNCE_MILLISECONDS: 1000,
  CITIES_QUERY_NAME: "cities",
  PROVINCES_TERRITORIES_QUERY_NAME: "provinceTerritories",
  INSTITUTION_QUERY_NAME: "institutions",
  CITY_FIELD: "city",
  CITIES_ENDPOINT: "api/v1/cities",
  PROVINCES_TERRITORIES_ENDPOINT: "api/v1/provinces_territories",
  SERVER_URL: "http://localhost:3000",
  CREATE_INSTITUTION_ENDPOINT: "api/v1/institution",
  UPDATE_INSTITUTION_ENDPOINT: "api/v1/institution",
  DELETE_INSTITUTION_ENDPOINT: "api/v1/institution",
  SEARCH_INSTITUTION_ENDPOINT: "api/v1/institution/search",
};
