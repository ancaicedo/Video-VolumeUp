const DEFAULT_VOLUME = 100;

// popup.html set-up
initDom();
getTabVolume();

function initDom() {
    document.getElementById("resetButton").addEventListener("click", handleResetButton);
    document.getElementById("volumeSlider").addEventListener("input", changeSliderVolume);
}

/**
 * Show the slider value in the HTML page.
 */
function changeSliderVolume() {
    // updates the UI
    let sliderValue = document.getElementById("volumeSlider").value;
    sliderValue = Number(sliderValue) - Number(sliderValue) % 10;
    document.getElementById("percentage").textContent = sliderValue + "%";
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                message: "change_volume",
            });
    });
    saveNewVolume();
}


/**
 * Sends a message to content.js to request adjustment of volume.
 */
function handleResetButton() {
    // updates the UI
    document.getElementById("volumeSlider").value = DEFAULT_VOLUME;
    document.getElementById("percentage").textContent = DEFAULT_VOLUME + "%";
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                message: "reset_volume",
            });
    });    
}


/**
 * Call content.js to save the new volume (i.e. currentVolumePercentage).
 */
function saveNewVolume() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                message: "save_volume",
                value: document.getElementById("volumeSlider").value
            });
    });
}


/**
 * Call content.js to get the saved volume value
 */
function getTabVolume() {
    chrome.tabs.query({active: true, currentWindow: true},
        function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    message: "get_volume",
                },
                function (response) {
                    document.getElementById("volumeSlider").value = response;
                    document.getElementById("percentage").textContent = response + "%";
                }
            );
        },
    );
}