const DEFAULT_VOLUME = 100;

intializeDom();
getTabVolume();

function intializeDom() {
    document.getElementById("sliderVolume").addEventListener("input", setSliderVolume);
    document.getElementById("resetButton").addEventListener("click", handleResetButton);
}

function getTabVolume() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {request: "current volume"}, function(response) {
            if (response) {
                document.getElementById("sliderVolume").value = response;
                document.getElementById("volumeOutput").textContent = response  + "%";
            }
        });
    });
}