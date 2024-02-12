chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // Obtener la URL de la pestaña activa
        let url = tabs[0].url;
        // Verificar si la URL corresponde a youtube
        if (url.includes("youtube.com/watch")) {
            // Ejecutar el script en la página actual
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: irAURL,
            });
        } else {
            console.log('La página actual no es Youtube.');
        }
    });
});

// Escuchar los mensajes enviados desde el content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message && message.type === 'content_script_message') {
        if (message.data.includes("youtube.com/watch")) {
            // Obtener la ID de la pestaña activa
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                // Cambiar el icono de la extensión
                chrome.action.setIcon({
                    tabId: tabs[0].id,
                    path: {
                        "16": "../logos/logo_16.png", // Ruta al icono de 16x16 píxeles
                        "24": "../logos/logo_24.png", // Ruta al icono de 24x24 píxeles
                        "32": "../logos/logo_32.png", // Ruta al icono de 32x32 píxeles
                        "48": "../logos/logo_48.png", // Ruta al icono de 48x48 píxeles
                        "128": "../logos/logo_128.png" // Ruta al icono de 128x128 píxeles
                    }
                });
            });
        } else {
            // Obtener la ID de la pestaña activa
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                //Cambiar el icono de la extensión
                chrome.action.setIcon({
                    tabId: tabs[0].id,
                    path: {
                        "16": "../logos/logo_16d.png", // Ruta al icono de 16x16 píxeles
                        "24": "../logos/logo_24d.png", // Ruta al icono de 24x24 píxeles
                        "32": "../logos/logo_32d.png", // Ruta al icono de 32x32 píxeles
                        "48": "../logos/logo_48d.png", // Ruta al icono de 48x48 píxeles
                        "128": "../logos/logo_128d.png" // Ruta al icono de 128x128 píxeles
                    }
                });
            });
        }
        // Envía una respuesta al content script si es necesario
        sendResponse({ received: true });
    }
});

function irAURL() {
    let currentUrl = window.location.href;
    let newUrl = currentUrl.replace("youtube", "azyoutube");
    window.location = newUrl;
}