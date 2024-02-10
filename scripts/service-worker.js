// background.js
chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // Obtener la URL de la pestaña activa
        let url = tabs[0].url;

        // Verificar si la URL corresponde a Google
        if (url.includes("youtube.com/watch")) {
            // Ejecutar el script en la página actual
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['scripts/content.js']
            });
        } else {
            console.log('La página actual no es Youtube.');
        }
    });
});