/*!
 * Copyright 2018 - 2026 Digital Bazaar, Inc.
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

import 'animate.css';
import 'quasar/dist/quasar.css';

import '../style/main.css';

import {Quasar, setCssVar} from 'quasar';
import {config} from '@bedrock/vue';
import {defineAsyncComponent} from 'vue';

// import all of quasar to achieve backwards and forward compatibility with
// changes to quasar v2.15 => 2.16+
import * as allQuasarImports from 'quasar';

config.ui.components['br-error-base'] = 'br-quasar-error-base';

/**
 * Initialize Quasar and related Bedrock components.
 *
 * @param {object} options - The options to use.
 * @param {object} options.app - The main Vue app.
 * @param {object} [options.quasarOptions] - Optional options to use when
 *   initializing Quasar. This can be used to pass in plugins and plugin
 *   options.
 */
export async function initialize({app, quasarOptions}) {
  if(typeof Quasar !== 'object') {
    throw new TypeError('"Quasar" must be an object.');
  }

  // backfill all quasar options to address backwards/forwards compatibility
  // with quasar v2.15 => 2.16+; a future version of this library may require
  // the application to be specific to enable tree-shaking
  quasarOptions = _createBackwardsCompatibilityOptions({quasarOptions});

  app.use(Quasar, quasarOptions);

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

function _createBackwardsCompatibilityOptions({quasarOptions}) {
  const allComponents = new Map();
  const allDirectives = new Map();
  const allPlugins = new Map();
  const unused = new Map();
  for(const [key, value] of Object.entries(allQuasarImports)) {
    // skip well-known non-matches
    if(key === 'Quasar') {
      continue;
    }

    // all plugins (and nothing else) use `install`
    if(typeof value?.install === 'function') {
      allPlugins.set(key, value);
      continue;
    }

    // components and directives have names that are cased differently
    const name = value?.name;
    if(typeof value !== 'function' && typeof name === 'string') {
      const isUpperCase = name[0] && name[0]?.toUpperCase() === name[0];
      if(isUpperCase) {
        allComponents.set(key, value);
      } else {
        allDirectives.set(key, value);
      }
    } else {
      unused.set(key, value);
    }
  }

  // enable all built-in components, directives, and plugins to achieve
  // backwards compatibility with quasar 2.15.x
  quasarOptions = {
    ...quasarOptions,
    components: {
      ...Object.fromEntries(allComponents),
      ...quasarOptions?.components
    },
    directives: {
      ...Object.fromEntries(allDirectives),
      ...quasarOptions?.directives
    },
    plugins: {
      ...Object.fromEntries(allPlugins),
      ...quasarOptions?.plugins
    }
  };
  return quasarOptions;
}
