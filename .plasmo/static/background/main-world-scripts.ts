import staticContent from "url:../../static/content"
chrome.scripting.registerContentScripts([
  {"id":"staticContent","js":[staticContent.split("/").pop().split("?")[0]],"matches":["https://*.linkedin.com/*"],"world":"MAIN"}
]).catch(_ => {})
