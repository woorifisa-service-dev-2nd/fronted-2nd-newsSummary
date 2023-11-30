const search = document.getElementById('text');
const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  const text = search.value;
  const url = '/search/news';
  let newsUrl;

  fetch(`${url}?query=${text}&sort=date`, { method: 'GET' })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.items[0]);
      console.log(data.items[0].title);
      console.log(data.items[0].description);
      console.log(data.items[0].pubDate);
      console.log(data.items[0].link);
      newsUrl = data.items[0].link;
      fetch('/scrap/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newsLink: newsUrl }),
      })
        .then((res) => res.json())
        .then((newsData) => {
          document.getElementById('article').innerHTML = newsData.news;
        });
    });
});
