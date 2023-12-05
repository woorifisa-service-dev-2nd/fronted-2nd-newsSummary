let naverNews = [];
let currentIndex = 0;
let searchedNewsArray = [];

// 검색 버튼
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
  const text = document.getElementById('text').value;
  const url = '/search/news';

  fetch(`${url}?query=${text}&sort=date`, { method: 'GET' })
    .then((res) => res.json())
    .then((data) => {
      // 'naver'가 포함된 뉴스만
      naverNews = data.items.filter((item) => item.link.includes('naver'));
      currentIndex = 0;
      searchedNewsArray.length = 0;

      if (naverNews.length > 0) {
        updateNews(currentIndex);
      } else {
        alert('naver 뉴스가 없어요');
      }
    });
});

// 뉴스 업데이트 함수
function updateNews(index) {
  const newsUrl = naverNews[index].link;

  scrap(newsUrl)
  .then((newsData) => {
    let searchedNews = {
      date: naverNews[index].pubDate.slice(0, 17),
      title: naverNews[index].title,
      article: newsData.news
    };
    searchedNewsArray[currentIndex] = searchedNews;
    display();
    });
}

// 스크래핑 함수
function scrap(newsUrl) {
  return fetch('/scrap/news', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newsLink: newsUrl }),
  })
    .then((res) => res.json())
}

// 요약 버튼
const summaryBtn = document.getElementById('summary-button');
summaryBtn.addEventListener('click', () => {
  fetch('/summary/news', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: naverNews[currentIndex].title,
      content: searchedNewsArray[currentIndex].article,
    }),
  })
    .then((res) => res.json())
    .then((summaryData) => {
      document.getElementById('summary').innerHTML = summaryData.summary;
    });
});

// 다음버튼
const nextBtn = document.getElementById('next');
nextBtn.addEventListener('click', () => {
  if (currentIndex < naverNews.length - 1) {
    currentIndex++;
    if (searchedNewsArray.length > currentIndex) {
      display();
    } else {
      updateNews(currentIndex);
    }
  } else {
    alert('더 이상 뉴스가 없습니다.');
  }
});

// 이전 버튼
const previousBtn = document.getElementById('previous');
previousBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    display();
  }
});

// 브라우저 화면에 출력
function display() {
  document.getElementById('article-date').innerHTML = '날짜: ' + searchedNewsArray[currentIndex].date;
  document.getElementById('article-title').innerHTML = '제목: ' + searchedNewsArray[currentIndex].title;
  document.getElementById('article').innerHTML = '본문: <br>' + searchedNewsArray[currentIndex].article;
}