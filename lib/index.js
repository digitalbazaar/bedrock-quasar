/*!
 * Copyright 2018 - 2024 Digital Bazaar, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// `animate.compat.css` version (with no prefixes) will actually be loaded
// via config in `package.json`
import 'animate.css';
import 'quasar/dist/quasar.css';

import '../style/main.css';

import {default as Quasar, setCssVar} from 'quasar';
import {config} from '@bedrock/vue';
import {defineAsyncComponent} from 'vue';

config.ui.components['br-error-base'] = 'br-quasar-error-base';

export async function initialize({app, options}) {
  if(typeof Quasar !== 'object') {
    throw new TypeError('"Quasar" must be an object.');
  }

  app.use(Quasar, options);    

  // eslint-disable-next-line vue/component-definition-name-casing
  app.component('br-quasar-error-base', defineAsyncComponent(() => import(
    /* webpackChunkName: "BrQuasarErrorBase" */
    '../components/BrQuasarErrorBase.vue')));
}

export async function theme({brand} = {}) {
  if(typeof brand !== 'object') {
    throw new TypeError('"brand" must be an object.');
  }
  Object.keys(brand).forEach(color => setCssVar(color, brand[color]));
}
