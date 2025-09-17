// ebayService.js
const { fetchFromEbay } = require("../apiClient");
const { parse } = require("csv-parse/sync");

const requestReport = async (startDate, endDate) => {
  return fetchFromEbay(
    `/Mediapartners/${process.env.EBAY_KEY}/ReportExport/ebay_partner_perf_by_campaign_v2.json`,
    {
      CLICKLESS: 0,
      TRAFFIC_TYPE: 0,
      CHECKOUT_SITE: 0,
      CAMPAIGN_SOLR: 0,
      START_DATE: startDate,
      END_DATE: endDate,
      timeRange: "CUSTOM",
      compareEnabled: false,
    }
  );
};

const checkReportStatus = async (queuedUri) => {
  const data = await fetchFromEbay(queuedUri);
  const status = data?.Status;

  if (status === "COMPLETED") {
    return { ready: true, resultUri: data.ResultUri };
  }
  return { ready: false };
};

const downloadReport = async (resultUri) => {
  const url = `https://api.partner.ebay.com${resultUri}`;
  const username = process.env.EBAY_KEY;
  const password = process.env.EBAY_SECRET;
  const basicAuth = Buffer.from(`${username}:${password}`).toString("base64");

  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${basicAuth}`,
      Accept: "application/json, text/csv",
      "User-Agent": "Node.js fetch client",
    },
  });

  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    // CSV response → parse it to JSON
    const csvText = await res.text();
    const records = parse(csvText, { columns: true });

    return records;
  }
};

module.exports = { requestReport, checkReportStatus, downloadReport };
