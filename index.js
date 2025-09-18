const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // <-- import cors

dotenv.config();
const app = express();

app.use(express.json());

// Allow all origins (for development)
app.use(cors());

// Or restrict to your frontend origin
// app.use(cors({ origin: "http://localhost:3001" }));

// Your routes
const reportRoutes = require("./routes/reportRoutes");
app.use("/api/report", reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
