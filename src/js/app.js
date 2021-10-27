//Import screnns html

import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import Error404Screen from './screens/Error404Screen.js';

//import funcions
import { parseRequestUrl } from './utils.js';
import { addProductToCard } from './screens/ProductScreen.js';
import { shoppingCard } from './screens/HomeScreen.js';

// import { settupAPP } from './screens/BusketScreen.js';

const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
};

const router = async () => {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');

  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const mains = document.querySelector('#featured');

  mains.innerHTML = await screen.renderHtml();
  await addProductToCard();

  // await slider();
};

window.addEventListener('load', function () {
  router();
  shoppingCard();
});

window.addEventListener('hashchange', router);
