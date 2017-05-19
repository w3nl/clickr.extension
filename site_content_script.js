script('node_modules/clickr/js/clickr.core');

chrome.runtime.onMessage.addListener(test);

/**
 * Inject the page with a script.
 *
 * @param {string} fileName
 */
function script(fileName) {
    var script = document.createElement('script');

    script.src = chrome.extension.getURL(fileName + '.js');
    script.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(script);
}

/**
 * Inject the page with a script.
 *
 * @param {string} code
 */
function scriptRaw(code) {
    var script = document.createElement('script');

    script.innerHTML = code;
    script.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(script);
}

/**
 * Run a test script in the page.
 *
 * @param {object}   message
 * @param {object}   sender
 * @param {function} response
 */
function test(message, sender, response) {
    if ((message.from === 'popup') && (message.subject === 'file')) {
        script('test.' + message.body);

        response({
            type:    message.subject,
            message: 'done'
        });
    }

    if ((message.from === 'popup') && (message.subject === 'code')) {
        scriptRaw(message.body);

        response({
            type:    message.subject,
            message: 'done'
        });
    }
}
