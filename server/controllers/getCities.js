import redisClient from "../data-access/redisClient.js";
import constants from "../constants.js";

export const getCities = async () => {
  const cities = await redisClient.sMembers(`${constants.CITY_KEY}`);
  return cities;
};
