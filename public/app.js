const search = document.getElementById('text');
const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  const text = search.value;
  const url = '/search/news';
  let newsUrl;

  fetch(`${url}?query=${text}&sort=date`, { method: 'GET' })
    .then((res) => res.json())
    .then((data) => {
      
      // 네이버 기사만 나오게 루프돌림
      let index = 0;
      while (true) {
        index++;
        if (data.items[index].link.charAt(8) == 'n') {
          break;
        }
      }

      newsUrl = data.items[index].link;
      console.log(newsUrl);

      fetch('/scrap/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newsLink: newsUrl }),
      })
        .then((res) => res.json())
        .then((newsData) => {
          document.getElementById('article').innerHTML = newsData.news;
          console.log(newsData.news);
        });
    });
});

// 네이버 뉴스만 나오게 루프돌림(네이버 태그는 똑같음)
// 오류 : 동영상 뉴스일 경우 내용이 없어서 요약이 안댐 >> 글자수 검토로 검증예정