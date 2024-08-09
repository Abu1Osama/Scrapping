// server.js
const express = require("express");
require("dotenv").config();
const scrapeEnrichmentKoala = require("./scraper");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000; // or any port of your choice
app.use(cors());
app.get("/api/scrape/:domain", async (req, res) => {
  const { domain } = req.params;
  const data = await scrapeEnrichmentKoala(domain);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
