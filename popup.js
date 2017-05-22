/* eslint-disable no-console */

/**
 * Automated clicker popup script.
 *
 * @return {object}
 */

// eslint-disable-next-line no-unused-vars
var Clickr = (function() {
    'use strict';

    var elements = {
        tests: 'js-popup-tests'
    };

    var globals = {
        tests: []
    };

    /**
     * Add all listeners.
     */
    function init() {
        check();
    }

    /**
     * Show all the tests from the options page.
     */
    function check() {
        var tests = document.getElementsByClassName(elements.tests)[0];

        tests.innerHTML = '';
        globals.tests = JSON.parse(localStorage.getItem('tests')) || globals.tests;

        if(!globals.tests) {
            return;
        }

        globals.tests.forEach(function(element) {
            var item = document.createElement('a');

            item.innerText = element;
            item.classList.add('button');
            item.addEventListener('click', function() {
                run(element);
            });

            tests.appendChild(item);
        });
    }

    /**
     * Call a custom test sript het the options page.
     *
     * @param {string} test
     */
    function run(test) {
        message('code', localStorage.getItem('test_' + test));
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
