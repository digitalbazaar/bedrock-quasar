export async function theme({Quasar, brand}) {
  const variables = {};
  Object.keys(brand).forEach(colorName => {
    Quasar.utils.colors.setBrand(colorName, brand[colorName]);
    variables[`q-color-${colorName}`] = brand[colorName];
  });
  if(isIE11()) {
    const cssVars = (await import('css-vars-ponyfill')).default;
    cssVars({variables});
  }
}

export async function supportIE11() {
  if(isIE11()) {
    await import('quasar-framework/dist/umd/quasar.ie.polyfills.umd.min');
  }
}

function isIE11() {
  return !!window.MSInputMethodContext && !!document.documentMode;
}
