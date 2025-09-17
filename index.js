const express = require("express");
const dotenv = require("dotenv");
const generateReport = require("./controllers/reportController");

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "eBay Backend API is running 🚀" });
});

app.get("/api/report", generateReport);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
