import './signIn.js';
import { router } from './frontendRouter.js';

router();


const logoutButton = document.querySelector('.js-logout-button');

logoutButton?.addEventListener("click", () => {
  console.log('lgogut clicked');
  window.location.pathname = '/';
})