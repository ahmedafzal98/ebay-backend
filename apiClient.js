// apiClient.js
require("dotenv").config();

const username = process.env.EBAY_KEY;
const password = process.env.EBAY_SECRET;

// Encode credentials in Base64 for Basic Auth
const basicAuth = Buffer.from(`${username}:${password}`).toString("base64");

const fetchFromEbay = async (endpoint, params = {}) => {
  // Build query string from params
  const query = new URLSearchParams(params).toString();
  const url = `https://api.partner.ebay.com${endpoint}?${query}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      Accept: "application/json",
      "User-Agent": "Node.js fetch client",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} - ${text}`);
  }

  return res.json();
};

module.exports = { fetchFromEbay };
