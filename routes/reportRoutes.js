const express = require("express");
const { createReport, getReportStatus } = require("../controllers/reportController");

const router = express.Router();

router.get("/create", createReport); // start report
router.get("/status", getReportStatus); // check report status

module.exports = router;
