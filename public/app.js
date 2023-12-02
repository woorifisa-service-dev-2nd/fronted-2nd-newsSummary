const search = document.getElementById('text');
const btn = document.getElementById('btn');
const summaryBtn = document.getElementById('summary-button');

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
      document.getElementById('article-title').innerHTML =
        '제목 : ' + naverNews[index].title;
      document.getElementById('article').innerHTML = '본문 : ' + newsData.news;
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

// 이전 버튼
const previousBtn = document.getElementById('previous');
previousBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateNews(currentIndex);
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


summaryBtn.addEventListener('click', () => {
  const newsUrl = naverNews[currentIndex].link;
  fetch('/scrap/news', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newsLink: newsUrl }),
  })
    .then((res) => res.json())
    .then((newsData) => {
      fetch('/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: naverNews[currentIndex].title,
          content: newsData.news,
        }),
      })
        .then((res) => res.json())
        .then((summaryData) => {
          document.getElementById('summary').innerHTML = summaryData.summary;
        });
    });
});
