import { SchemaFieldTypes } from "redis";
import shell from "shelljs";
import redisClient from "../data-access/redisClient.js";
import constants from "../constants.js";

export const updateCities = async (redisClient) => {
  const dbSize = await redisClient.dbSize();
  const results = await redisClient.ft.search(`${constants.REDIS_INDEX}`, "*", {
    LIMIT: {
      from: 0,
      size: dbSize,
    },
  });
  const cities = results.documents.map((institution) => institution.value.city);
  await redisClient.sAdd(`${constants.CITY_KEY}`, [...cities]);
};

export const createProvinceTerritoryData = async (redisClient) => {
  await redisClient.sAdd(
    `${constants.PROVINCES_TERRITORIES_KEY}`,
    constants.PROVINCES_TERRITORIES
  );
};

export const createIndex = async (redisClient) => {
  try {
    await redisClient.ft.create(
      `${constants.REDIS_INDEX}`,
      {
        name: {
          type: SchemaFieldTypes.TEXT,
          SORTABLE: true,
        },
        city: {
          type: SchemaFieldTypes.TEXT,
          SORTABLE: true,
        },
        province_territory: {
          type: SchemaFieldTypes.TEXT,
          SORTABLE: true,
        },
        id: {
          type: SchemaFieldTypes.TEXT,
        },
      },
      {
        ON: "HASH",
        PREFIX: `${constants.ID_PREFIX}`,
      }
    );
  } catch (e) {
    if (e.message === "Index already exists") {
      console.log("Index exists already, skipped creation.");
    } else {
      console.error(e);
      process.exit(1);
    }
  }
};

/**
 * If something goes wrong with populating test data then exit the program and manually restart the server
 */

export const populateData = async () => {
  try {
    await redisClient.flushAll("ASYNC");
    await createIndex(redisClient);
    await createProvinceTerritoryData(redisClient);
    shell.exec("cat data-access/data.txt | redis-cli --pipe");
    await updateCities(redisClient);
  } catch {
    console.error(e);
    process.exit(1);
  }
};
