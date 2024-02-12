let currentUrl = window.location.href;
// Enviar un mensaje al service worker
chrome.runtime.sendMessage({
    type: 'content_script_message',
    data: currentUrl
});