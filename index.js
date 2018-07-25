import cssVars from 'css-vars-ponyfill';

const api = {};

api.theme = ({Quasar, brand}) => {
  const variables = {};
  Object.keys(brand).forEach(colorName => {
    Quasar.utils.colors.setBrand(colorName, brand[colorName]);
    variables[`q-color-${colorName}`] = brand[colorName];
  });
  // check for IE11
  if(!!window.MSInputMethodContext && !!document.documentMode)  {
    cssVars({variables});
  }
};

export default api;
