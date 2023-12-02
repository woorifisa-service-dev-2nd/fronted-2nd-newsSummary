const darkmodeBtn = document.getElementById('darkmode-btn');
const html = document.documentElement;
const divs = document.querySelectorAll('div');
const logo = document.getElementById('logo');
const icon = darkmodeBtn.querySelector('i');

darkmodeBtn.addEventListener('click', () => {
  html.classList.toggle('dark-mode');
  document.body.classList.toggle('dark-mode');
  divs.forEach((div) => div.classList.toggle('dark-mode'));
  // 다크모드일 때
  if (document.body.classList.contains('dark-mode')) {
    logo.src = './images/logo_White.png';
    icon.className = 'fa-solid fa-sun';
    icon.style.color = '#ffffff';
  // 아닐 때
  } else {
    logo.src = './images/logo_Green.png';
    icon.className = 'fa-solid fa-moon';
    icon.style.color = '#000000';
  }
});
