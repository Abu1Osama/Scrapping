// scraper.js
const { JSDOM } = require("jsdom");

async function scrapeEnrichmentKoala(domain) {
  if (!domain) return { error: "Invalid domain" };

  const scrapeURL = `${process.env.SCRAPE_URL}/${domain}`;
  const resp = await fetch(scrapeURL, { cache: "no-cache" });
  const respText = await resp.text();

  const dom = new JSDOM(respText);
  const scriptNode = dom.window.document.querySelector("#__NEXT_DATA__");
  if (!scriptNode) {
    if (respText.indexOf("Just a moment...") >= 0) {
      console.error(scrapeURL, "cloudflare block");
      return { error: "cloudflare block" };
    }
    return { error: "data not found" };
  }
  const jsonData = JSON.parse(scriptNode.innerHTML);
  const data = jsonData["props"]["pageProps"]["company"];

  if (!data) {
    console.log(scrapeURL, jsonData["props"]["pageProps"]);
    return { error: "company data not found" };
  }
  return data;
}

module.exports = scrapeEnrichmentKoala;
