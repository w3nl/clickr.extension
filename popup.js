/* eslint-disable no-console */

/**
 * Automated clicker popup script.
 *
 * @return {object}
 */

// eslint-disable-next-line no-unused-vars
var Clickr = (function() {
    'use strict';

    /**
     * Add all listeners.
     */
    function init() {
        document.getElementsByClassName('js-login')[0].addEventListener('click', login);
        document.getElementsByClassName('js-custom')[0].addEventListener('click', custom);
    }

    /**
     * Call the login test.
     */
    function login() {
        message('file', 'login');
    }

    /**
     * Call a custom test sript het the options page.
     */
    function custom() {
        message('code', localStorage.getItem('code'));
    }

    /**
     * Send a message to the content script.
     *
     * @param {string} type
     * @param {string} code
     */
    function message(type, code) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            if(tabs.length > 0) {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    {
                        from:     'popup',
                        subject:  type,
                        body:     code
                    },
                    callbackAction
                );
            }
        });
    }

    /**
     * Callback function from the message from the content script.
     *
     * @param {object} info
     */
    function callbackAction(info) {

    }

    return {
        init: init
    };
});

var test = new Clickr();

document.addEventListener('DOMContentLoaded', function() {
    test.init();
});
