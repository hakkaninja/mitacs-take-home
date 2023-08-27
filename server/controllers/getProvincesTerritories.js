import redisClient from "../data-access/redisClient.js";
import constants from "../constants.js";

export const getProvincesTerritories = async () => {
  const result = await redisClient.sMembers(
    `${constants.PROVINCES_TERRITORIES_KEY}`
  );
  return result;
};
