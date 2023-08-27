import { createInstitution } from "./createInstitution.js";
import { removeInstitution } from "./removeInstitution.js";
import { updateInstitution } from "./updateInstitution.js";
import { findInstitution } from "./findInstitution.js";
import { getProvincesTerritories } from "./getProvincesTerritories.js";
import { getCities } from "./getCities.js";

const service = Object.freeze({
  createInstitution,
  updateInstitution,
  findInstitution,
  removeInstitution,
  getProvincesTerritories,
  getCities,
});

export default service;
