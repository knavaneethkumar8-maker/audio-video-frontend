console.log('testing');
console.log('hello');

const googleSignInButton = document.querySelector('.js-google-oauth-button');

googleSignInButton?.addEventListener('click', async () => {
  console.log('google oauth');
 window.location.href = 'http://localhost:7500/auth/google';
});