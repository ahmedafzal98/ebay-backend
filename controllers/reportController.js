// reportController.js
const { requestReport, checkReportStatus, downloadReport } = require("../services/ebayService");

const generateReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const job = await requestReport(startDate, endDate);

    let status = { ready: false };

    // Poll every 5 seconds until report is ready
    while (!status.ready) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      status = await checkReportStatus(job.QueuedUri);
    }

    const report = await downloadReport(status.resultUri);

    res.json(report);
  } catch (error) {
    console.error("Error generating report:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = generateReport;
