import { v4 as uuidv4 } from "uuid";
import redisClient from "../data-access/redisClient.js";
import Institution from "../models/Institution.js";
import { updateCities } from "../helpers/helpers.js";
import constants from "../constants.js";

export const createInstitution = async (props) => {
  const id = `${constants["ID_PREFIX"]}${uuidv4()}`;
  const institution = new Institution({ ...props, id });
  const cityExists = await redisClient.sIsMember(
    `${constants.CITY_KEY}`,
    props.city
  );
  const result = await redisClient.hSet(id, institution);
  if (result > 0 && !cityExists) {
    await updateCities(redisClient);
  }
  return result;
};
