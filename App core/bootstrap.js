'use strict';

window._ = import( /* webpackChunkName: "vendor" */  'lodash');


/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

window.$ = window.jQuery = import(/* webpackChunkName: "vendor" */ 'jquery');


/**
 * Vue is a modern JavaScript library for building interactive web interfaces
 * using reactive data binding and reusable components. Vue's API is clean
 * and simple, leaving you to focus on building your next great project.
 */

import Vue from /* webpackChunkName: "vendor" */ 'vue';
window.Vue = Vue;
