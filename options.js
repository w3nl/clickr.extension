/* eslint-disable no-console */

/**
 * Automated clicker options script.
 *
 * @return {object}
 */

// eslint-disable-next-line no-unused-vars
var Clickr = (function() {
    'use strict';

    var elements = {
        form: 'js-options-save',
        code: 'js-code'
    };

    /**
     * Add all listeners.
     */
    function init() {
        check();
        document.getElementsByClassName(elements.form)[0].addEventListener('click', save);
    }

    /**
     * Get the code from the localstorage.
     */
    function check() {
        var code = localStorage.getItem('code');

        document.getElementsByClassName(elements.code)[0].value = code;
    }

    /**
     * Save the code.
     *
     * @param {object} event
     */
    function save(event) {
        var code = document.getElementsByClassName(elements.code)[0].value;

        event.preventDefault();

        localStorage.setItem('code', code);
    }

    return {
        init: init
    };
});

var test = new Clickr();

document.addEventListener('DOMContentLoaded', function() {
    test.init();
});
