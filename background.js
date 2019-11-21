var enabled = true;

// Rewrite url if enabled to contain ?w=1
function renavigate(details) {
  if (!enabled) return;

  var newUrl = new URL(details.url);
  if (newUrl.searchParams.get('w') === '1') return;
  newUrl.searchParams.set('w', '1');
  return { redirectUrl: newUrl.href };
}

// Toggles on/off for extension
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.cmd === "setOnOffState") {
      enabled = request.data.value;
    }

    if (request.cmd === "getOnOffState") {
      sendResponse(enabled);
    }
  }
);

chrome.webRequest.onBeforeRequest.addListener(
  renavigate,
  { urls: ["*://github.com/*/pull/*"] },
  ["blocking"]
);
