document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.getElementById("enabled");

  chrome.extension.sendMessage({ cmd: "getOnOffState" }, function (response) {
    if (response !== undefined) {
      checkbox.checked = !!response
    }
  });

  checkbox.onclick = function(event) {
    chrome.extension.sendMessage({ cmd: "setOnOffState", data: { value: event.target.checked } });
  }
});
