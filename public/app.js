const search = document.getElementById('text');
const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  const text = search.value;
  console.log(text);

  const url = '/search/news';
//   const url = '/search/shop';
  const options = {
      method: 'GET',
  };

  fetch(`${url}?query=${text}&sort=date`, options)
  .then(res => res.json())
  .then(data => console.log(data.items[0].title));
});