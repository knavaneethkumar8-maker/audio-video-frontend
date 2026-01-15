let routeExists = 0;
const mainApp = document.querySelector('.js-app');

function route(url, handler) {
  const pattern = new URLPattern({pathname : `${url}`});
  const urlPath = window.location.pathname;
  console.log(urlPath);
  const matched = pattern.exec({pathname : urlPath});

  if(matched) {
    console.log(matched.pathname.groups.userId);
    handler();
    routeExists++;
    return true;
  } else {
    return false;
  }
}


export function router() {
  console.log('router running');
  const urlPath = window.location.pathname;
  console.log(urlPath);

  route('/:userId/profile', () => {
    console.log('render user profile');
  });

  route('/video', () => {
    renderVideoPage();
    const videoPageHTML = `
    <h1>
      Video
    </h1>`
    mainApp.innerHTML = videoPageHTML;
  });
}

async function renderVideoPage() {
  console.log("video page");
}