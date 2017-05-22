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
        tests: 'js-options-tests',
        test:  'js-options-test',
        form:  'js-options-save',
        code:  'js-options-code',
        name:  'js-options-name',
        new:  'js-options-new'
    };

    var globals = {
        tests: [],
        test:  null
    };

    /**
     * Add all listeners.
     */
    function init() {
        check();
        document.getElementsByClassName(elements.form)[0].addEventListener('click', save);
        document.getElementsByClassName(elements.new)[0].addEventListener('click', newTest);
    }

    /**
     * Get the tests from the localstorage.
     */
    function check() {
        var tests = document.getElementsByClassName(elements.tests)[0];

        document.getElementsByClassName(elements.test)[0].setAttribute('hidden', 'hidden');

        tests.innerHTML = '';
        globals.tests = JSON.parse(localStorage.getItem('tests')) || globals.tests;

        if(!globals.tests) {
            return;
        }

        globals.tests.forEach(function(test) {
            var item = document.createElement('tr');
            var itemLink = document.createElement('td');
            var itemRemove = document.createElement('td');

            itemLink.innerText = test;
            itemLink.addEventListener('click', function() {
                open(test);
            });

            itemRemove.innerText = 'X';
            itemRemove.addEventListener('click', function() {
                remove(test);
            });

            item.appendChild(itemLink);
            item.appendChild(itemRemove);

            tests.appendChild(item);
        });
    }

    /**
     * Show the form for a new test.
     */
    function newTest() {
        globals.test = null;

        document.getElementsByClassName(elements.test)[0].removeAttribute('hidden');
        document.getElementsByClassName(elements.code)[0].value = '';
        document.getElementsByClassName(elements.name)[0].removeAttribute('disabled');
        document.getElementsByClassName(elements.name)[0].value = '';
    }

    /**
     * Show the form with results from an existing test.
     *
     * @param {string} test
     */
    function open(test) {
        var code = localStorage.getItem('test_' + test);

        globals.test = test;

        document.getElementsByClassName(elements.test)[0].removeAttribute('hidden');
        document.getElementsByClassName(elements.name)[0].setAttribute('disabled', 'disabled');
        document.getElementsByClassName(elements.name)[0].value = test;
        document.getElementsByClassName(elements.code)[0].value = code;
    }

    /**
     * Remove a test.
     *
     * @param {string} test
     */
    function remove(test) {
        var testPosition = globals.tests.indexOf(test);

        globals.tests.splice(testPosition, 1);

        localStorage.removeItem('test_' + test);
        localStorage.setItem('tests', JSON.stringify(globals.tests));

        check();
    }

    /**
     * Save the test.
     *
     * @param {object} event
     */
    function save(event) {
        var code = document.getElementsByClassName(elements.code)[0].value;
        var name = document.getElementsByClassName(elements.name)[0].value;
        var testPosition;

        event.preventDefault();

        if(!globals.test) {
            testPosition = globals.tests.indexOf(name);
            if(!name || testPosition >= 0) {
                check();

                return;
            }

            globals.test = name;
            globals.tests.push(name);
        }

        localStorage.setItem('test_' + globals.test, code);
        localStorage.setItem('tests', JSON.stringify(globals.tests));

        check();
    }

    return {
        init: init
    };
});

var test = new Clickr();

document.addEventListener('DOMContentLoaded', function() {
    test.init();
});
