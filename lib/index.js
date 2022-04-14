/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
/* eslint-disable vue/component-definition-name-casing */
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
  '../components/BrQuasarErrorBase.vue'));

export async function theme({Quasar, brand}) {
  Object.keys(brand).forEach(color => {
    Quasar.utils.colors.setBrand(color, brand[color]);
  });
}
