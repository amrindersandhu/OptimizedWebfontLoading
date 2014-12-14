//This script must be placed in the HEAD above all external stylesheet declarations (link[rel=stylesheet])
function loadFont(fontName, woffUrl, woff2Url) {

    // 1. Setting up localStorage
    var loSto = {};
    try {
        // We set up a proxy variable to help with localStorage, e.g. when cookies are disabled
        // and the browser prevents us accessing it.
        // Otherwise some exceptions can be thrown which completely prevent font loading.
        loSto = localStorage || {};
    } catch(ex) {}

    var localStoragePrefix = 'x-font-' + fontName;
    var localStorageUrlKey = localStoragePrefix + 'url';
    var localStorageCssKey = localStoragePrefix + 'css';
    var storedFontUrl = loSto[localStorageUrlKey];
    var storedFontCss = loSto[localStorageCssKey];


    // 2. Setting up the <style> element, that we are using to apply the base64 encoded font data
    var styleElement = document.createElement('style');
    styleElement.rel = 'stylesheet';
    document.head.appendChild(styleElement); // IE8 throws an error here, which is OK, since it doesn't support either WOFF or WOFF2
    // Setting styleElement.textContent must be after this line, because of IE9 errors


    // 3. Checking whether the font data is already in localStorage and up-to-date
    if (storedFontCss && (storedFontUrl === woffUrl || storedFontUrl === woff2Url)) {
        // the css is still in the localStorage
        // AND it was loaded from one of the current URLs
        
        // 4. Applying the font style sheet
        styleElement.textContent = storedFontCss;
    } else {
        // The data was not present, or loaded from an obsolete URL
        // So we have to load it again

        // 5. Checking for WOFF2 support to know which URL we should use
        var url = (woff2Url && supportsWoff2())
            ? woff2Url // WOFF2 URL provided and supported
            : woff2Url; // only WOFF support


        // 6. Fetching the font data from the server
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                
                // 7. Updating localStorage with the fresh data and applying the font data
                loSto[localStorageUrlKey] = url;
                loSto[localStorageCssKey] = styleElement.textContent = request.responseText;
            }
        };
        request.send();
    }

    function supportsWoff2() {
        // Source: https://github.com/filamentgroup/woff2-feature-test
        if (!window.FontFace) {
            return false;
        }

        var f = new FontFace('t', 'url("data:application/font-woff2,") format("woff2")');
        f.load();

        return f.status === 'loading';
    }
}