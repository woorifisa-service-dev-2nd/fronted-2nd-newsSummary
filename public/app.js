const search = document.getElementById('text');
const btn = document.getElementById('btn');
let naverNews = [];
let currentIndex = 0;

// 뉴스 업데이트 함수
function updateNews(index) {
  console.log(naverNews[index].title);
  console.log(naverNews[index].description);
  console.log(naverNews[index].pubDate);
  console.log(naverNews[index].link);

  const newsUrl = naverNews[index].link;
  fetch('/scrap/news', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newsLink: newsUrl }),
  })
    .then((res) => res.json())
    .then((newsData) => {
      console.log(newsData);
      document.getElementById('article').innerHTML = newsData.news;
    });
}

// 다음 버튼
const nextBtn = document.getElementById('next');
nextBtn.addEventListener('click', () => {
  if (currentIndex < naverNews.length - 1) {
    currentIndex++;
    updateNews(currentIndex);
  } else {
    console.log('더 이상 뉴스가 없습니다.');
  }
});

btn.addEventListener('click', () => {
  const text = search.value;
  const url = '/search/news';

  fetch(`${url}?query=${text}&sort=date`, { method: 'GET' })
    .then((res) => res.json())
    .then((data) => {
      // 'naver'가 포함된 뉴스만
      naverNews = data.items.filter((item) => item.link.includes('naver'));
      currentIndex = 0;

      if (naverNews.length > 0) {
        updateNews(currentIndex);
      } else {
        console.log('naver 뉴스가 없어요');
      }
    });
});
