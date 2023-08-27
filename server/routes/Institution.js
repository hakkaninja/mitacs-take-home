import express from "express";
import service from "../controllers/index.js";
const router = express.Router();
import constants from "../constants.js";

router.get(`${constants.GET_INSTITUTIONS_ROUTE}`, async (req, res) => {
  try {
    const results = await service.findInstitution(req.query);
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch {
    res.status(404).json({
      success: false,
      msg: "Unable to find institutions, please try again later",
    });
  }
});
router.post(`${constants.CREATE_INSTITUTION_ROUTE}`, async (req, res) => {
  try {
    const result = await service.createInstitution(req.body);
    if (result < 1) {
      res.status(500).json({
        success: false,
        msg: "Unable to create institution, please try again later",
      });
    }
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Unable to create institution, please try again later",
    });
  }
});

router.put(`${constants.UPDATE_INSTITUTION_ROUTE}`, async (req, res) => {
  try {
    await service.updateInstitution({
      ...req.body,
      ...req.params,
    });
    res.status(204).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Unable to update institution, please try again later",
    });
  }
});

router.delete(`${constants.REMOVE_INSTITUTION_ROUTE}`, async (req, res) => {
  try {
    const result = service.removeInstitution(req.params);
    if (result < 1) {
      res.status(500).json({
        success: false,
        msg: "Unable to delete institution, please try again later",
      });
    }
    res.status(204).json();
  } catch {
    res.status(500).json({
      success: false,
      msg: "Unable to delete institution, please try again later",
    });
  }
});

export { router as institutionRouter };
