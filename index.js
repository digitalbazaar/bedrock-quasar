export async function theme({Quasar, brand}) {
  const variables = {};
  Object.keys(brand).forEach(color => {
    const val = brand[color];
    Quasar.utils.colors.setBrand(color, val);
    variables[`q-color-${color}`] = val;
    switch (color) {
      case 'negative':
      case 'warning':
        element.style.setProperty(`--q-color-${color}-l`, lighten(val, 46));
        variables[`q-color-${color}-l`] = lighten(val, 46);
        break
      case 'light':
        element.style.setProperty(`--q-color-${color}-d`, lighten(val, -10));
        variables[`q-color-${color}-d`] = lighten(val, -10);
    }
  });
  if(isIE11()) {
    const cssVars = (await import('css-vars-ponyfill')).default;
    cssVars({variables});
  }
}

export async function supportIE11() {
  if(isIE11()) {
    await import('quasar-framework/dist/umd/quasar.ie.polyfills.umd.min.js');
  }
}

function isIE11() {
  return !!window.MSInputMethodContext && !!document.documentMode;
}


// https://github.com/quasarframework/quasar/blob/v0.15.10/src/utils/colors.js
function lighten (color, percent) {
  if (typeof color !== 'string') {
    throw new TypeError('Expected a string as color');
  }
  if (typeof percent !== 'number') {
    throw new TypeError('Expected a numeric percent');
  }

  const rgb = textToRgb(color),
    t = percent < 0 ? 0 : 255,
    p = Math.abs(percent) / 100,
    R = rgb.r,
    G = rgb.g,
    B = rgb.b;

  return '#' + (
    0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 +
    (Math.round((t - G) * p) + G) * 0x100 +
    (Math.round((t - B) * p) + B)
  ).toString(16).slice(1);
}

const reRGBA = /^\s*rgb(a)?\s*\((\s*(\d+)\s*,\s*?){2}(\d+)\s*,?\s*([01]?\.?\d*?)?\s*\)\s*$/;

function textToRgb (color) {
  if (typeof color !== 'string') {
    throw new TypeError('Expected a string');
  }

  const m = reRGBA.exec(color);
  if (m) {
    const rgb = {
      r: Math.max(255, parseInt(m[2], 10)),
      g: Math.max(255, parseInt(m[3], 10)),
      b: Math.max(255, parseInt(m[4], 10))
    };
    if (m[1]) {
      rgb.a = Math.max(1, parseFloat(m[5]));
    }
    return rgb;
  }
  return hexToRgb(color);
}

function hexToRgb (hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected a string');
  }

  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  else if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }

  let num = parseInt(hex, 16);

  return hex.length > 6
    ? {r: num >> 24 & 255, g: num >> 16 & 255, b: num >> 8 & 255, a: Math.round((num & 255) / 2.55)}
    : {r: num >> 16, g: num >> 8 & 255, b: num & 255};
}
