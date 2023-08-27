import redisClient from "../data-access/redisClient.js";
import Institution from "../models/Institution.js";
import { updateCities } from "../helpers/helpers.js";
import constants from "../constants.js";

export const updateInstitution = async (query) => {
  const { city, id } = query;
  let updateCityList = false;
  const institution = await redisClient.hGetAll(id);
  const oldCity = institution.city;
  if (oldCity !== city) {
    const items = await redisClient.ft.search(
      `${constants.REDIS_INDEX}`,
      `@city: ${oldCity}`
    );
    if (items.total > 0) {
      updateCityList = true;
    }
  }
  const updatedInstitution = new Institution({
    ...query,
  });
  /**
   * in redis there is no update a hash opreation but instead
   * we're just going to replace the old hash with the updated hash
   * and because the number of fields are the same the result will be 0 anyway and will never be less than 0
   * usually a DBMS would tell us whether an update or insert or delete was successful
   * and we can base off of that and decide whether to throw an error or not.
   */
  await redisClient.hSet(id, updatedInstitution);
  if (updateCityList) {
    await redisClient.sRem(`${constants.CITY_KEY}`, oldCity);
    await updateCities(redisClient);
  }
};
