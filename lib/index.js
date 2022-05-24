/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
// NOTE: This *must* be loaded *before* 'quasar'.
import 'firefox-iframe-getcomputedstyle';

import 'animate.css';
import 'quasar/dist/quasar.css';

import '../style/main.css';

import {config} from '@bedrock/vue';
import {default as Quasar, setCssVar} from 'quasar';

config.ui.components['br-error-base'] = 'br-quasar-error-base';

export async function initialize({app}) {
  if(typeof Quasar !== 'object') {
    throw new TypeError('"Quasar" must be an object.');
  }

  app.use(Quasar);

  // eslint-disable-next-line vue/component-definition-name-casing
  app.component('br-quasar-error-base', () => import(
    /* webpackChunkName: "BrQuasarErrorBase" */
    '../components/BrQuasarErrorBase.vue'));
}

export async function theme({brand} = {}) {
  if(typeof brand !== 'object') {
    throw new TypeError('"brand" must be an object.');
  }
  Object.keys(brand).forEach(color => setCssVar(color, brand[color]));
}
