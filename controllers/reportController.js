// reportController.js
const { requestReport, checkReportStatus, downloadReport } = require("../services/ebayService");

// const generateReport = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;
//     const job = await requestReport(startDate, endDate);

//     let status = { ready: false };

//     // Poll every 5 seconds until report is ready
//     while (!status.ready) {
//       await new Promise((resolve) => setTimeout(resolve, 5000));
//       status = await checkReportStatus(job.QueuedUri);
//     }

//     const report = await downloadReport(status.resultUri);

//     res.json(report);
//   } catch (error) {
//     console.error("Error generating report:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

const createReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const job = await requestReport(startDate, endDate);

    // Return jobId immediately
    res.json({ status: "QUEUED", jobId: job.QueuedUri });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReportStatus = async (req, res) => {
  try {
    const { jobId } = req.query;
    const status = await checkReportStatus(jobId);

    if (status.ready) {
      const report = await downloadReport(status.resultUri);
      return res.json({ status: "COMPLETED", data: report });
    }

    return res.json({ status: "QUEUED" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createReport, getReportStatus };
