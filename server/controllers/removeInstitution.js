import redisClient from "../data-access/redisClient.js";
import constants from "../constants.js";

export const removeInstitution = async (query) => {
  let updateCityList = false;
  const institution = await redisClient.hGetAll(query.id);
  const city = institution.city;
  const items = await redisClient.ft.search(
    `${constants.REDIS_INDEX}`,
    `@city: ${city}`
  );
  if (items.total === 1) {
    updateCityList = true;
  }
  const result = await redisClient.del(query.id);
  if (result > 0) {
    if (updateCityList) {
      await redisClient.sRem(`${constants.CITY_KEY}`, city);
    }
  }
  return result;
};
