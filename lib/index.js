/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
/* global CSSStyleDeclaration, document, window */
'use strict';

// NOTE: This *must* be loaded *before* 'quasar'.
import 'firefox-iframe-getcomputedstyle';

import 'animate.css';
import 'quasar/dist/quasar.css';

import '../style/main.css';

import Vue from 'vue';
import {config} from '@bedrock/vue';

config.ui.components['br-error-base'] = 'br-quasar-error-base';
Vue.component('br-quasar-error-base', () => import(
  /* webpackChunkName: "BrQuasarErrorBase" */
  './BrQuasarErrorBase.vue'));

export async function theme({Quasar, brand}) {
  let fn;
  const variables = {};

  if(isIE11()) {
    // temporary monkey-patch to track variables
    fn = CSSStyleDeclaration.prototype.setProperty;
    CSSStyleDeclaration.prototype.setProperty = function(
      property, value, priority) {
      if(property.startsWith('--')) {
        variables[property] = value;
      }
      return fn.call(this, property, value, priority);
    };
  }

  Object.keys(brand).forEach(color => {
    Quasar.utils.colors.setBrand(color, brand[color]);
  });

  if(isIE11()) {
    addCssVarsElement();

    // remove monkey-patch and apply variables
    CSSStyleDeclaration.prototype.setProperty = fn;
    const cssVars = (await import(
      /* webpackChunkName: "css-vars-ponyfill" */
      'css-vars-ponyfill')).default;
    cssVars({variables});
  }
}

export async function supportIE11() {
  if(!isIE11()) {
    return;
  }
  await import(
    /* webpackChunkName: "quasar.ie.polyfills" */
    'quasar/dist/quasar.ie.polyfills.umd.min.js');

  // TODO: consider monkey-patching CSSStyleDeclaration.prototype.setProperty
  // here just once -- and then use render fn to call cssVars() when new
  // variables are set/changed to handle non-theme cases if necessary
}

function isIE11() {
  return !!window.MSInputMethodContext && !!document.documentMode;
}

function addCssVarsElement() {
  const elem = document.createElement('style');
  elem.setAttribute('id', 'css-vars-ponyfill');
  document.head.appendChild(elem);
}
