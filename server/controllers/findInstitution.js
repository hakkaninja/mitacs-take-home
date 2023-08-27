import redisClient from "../data-access/redisClient.js";
import constants from "../constants.js";

export const findInstitution = async (query) => {
  const { id, keyword, city, province_territory } = query;
  let results = [];
  if (Object.keys(query).length < 1) {
    const dbSize = await redisClient.dbSize();
    results = await redisClient.ft.search(`${constants.REDIS_INDEX}`, "*", {
      LIMIT: {
        from: 0,
        size: dbSize,
      },
    });
  } else {
    const idField = id ? `@id: ${id},` : "";
    const nameField = keyword ? `@name: ${keyword},` : "";
    const cityField = city ? ` @city: ${city},` : "";
    const provinceTerritoryField = province_territory
      ? ` @province_territory: ${province_territory}`
      : "";
    const searchString =
      idField + nameField + cityField + provinceTerritoryField;
    results = await redisClient.ft.search(
      `${constants.REDIS_INDEX}`,
      searchString
    );
  }
  return results;
};
