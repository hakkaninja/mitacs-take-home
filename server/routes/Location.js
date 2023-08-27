import express from "express";
import service from "../controllers/index.js";
const router = express.Router();
import constants from "../constants.js";

router.get(`${constants.PROVINCES_TERRITORIES_ROUTE}`, async (req, res) => {
  try {
    const results = await service.getProvincesTerritories();
    if (results.length > 0) {
      res.status(200).json({
        success: true,
        data: results,
      });
    }
  } catch {
    res.status(500).json({
      success: false,
      msg: "Unable to retrieve provices and territories, please try again later",
    });
  }
});

router.get(`${constants.CITIES_ROUTE}`, async (req, res) => {
  try {
    const results = await service.getCities();
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch {
    res.status(500).json({
      success: false,
      msg: "Unable to retrieve cities, please try again later",
    });
  }
});

export { router as locationRouter };
