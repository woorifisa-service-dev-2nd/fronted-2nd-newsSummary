## 📝 프로젝트 소개
- 최신 네이버 뉴스를 요약해주는 서비스
- 사용한 API: NAVER 검색(뉴스) API, NAVER Cloud 문서요약 API
<br/>
<br/>

## 🙋‍♂️ 팀원 소개

| [이진천](https://github.com/LeeJincheon)      | [김남혁](https://github.com/knh9612)      | [김지관](https://github.com/zc149)      | [김유은](https://github.com/YueunKim)      |
| --------------------------------------------- | ----------------------------------------- | --------------------------------------- | ------------------------------------------ |
| ![이진천](https://github.com/LeeJincheon.png) | ![김남혁](https://github.com/knh9612.png) | ![김지관](https://github.com/zc149.png) | ![김유은](https://github.com/YueunKim.png) |

<br/>
<br/>

## 🛠 기술 스택

<img alt=""  src ="https://img.shields.io/badge/html5-E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/> <img alt=""  src ="https://img.shields.io/badge/css3-1572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/> <img alt=""  src ="https://img.shields.io/badge/javascript-F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=white"/> <img alt=""  src ="https://img.shields.io/badge/node.js-339933.svg?&style=for-the-badge&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

<br/>
<br/>

## 💻 협업 방식
지금까지 배운 내용들을 스스로 적용해 볼 수 있도록 각자 코드를 작성하고 팀원들과 상의하여 git에 push했습니다.
모르는 내용은 슬랙으로 서로 정보를 공유하면서 해결했습니다.
<br/>
<br/>

## ⚙ 기능 시연

<br/>
<br/>

## 📲 도메인 용어 정의
- searchBtn	 : 클릭 이벤트 발생시 네이버 뉴스 검색 API에 GET 요청

- naverNews : url을 필터링하여 naver 포털의 뉴스 url만 저장된 변수

- updateNews : 관련 뉴스가 존재하면 해당 뉴스의 스크래핑을 하도록 scrap함수를 호출하는 함수

- scrap : newsUrl 을 인자로 받아  POST 방식으로 스크래핑 값을 요청하는 함수

- summaryBtn : 클릭 이벤트 발생시 내용 요약 API에  POST 방식으로 제목,내용을 body에 넣어 내용 요약요청

- nextBtn, previousBtn : 클릭 이벤트 발생시 인덱스를 1씩 증감시켜 현재 인덱스 전후의 기사를 출력

- previousBtn : 클릭 이벤트 발생시 인덱스를 1씩 증감시켜 현재 인덱스 전후의 기사를 출력

- display : 내용 요약전 기사의 날짜,제목,본문을 출력하는 함수

- cleanText : 내용 요약전 기사 본문의 공백 제거 함수

- browser : puppeteer APl를 통해 백그라운드로 스크랩할 url에 접근

- requestBody : 내용 요약 API에 원하는 값을 요청하기 위하 form을 담은 변수

<br/>
<br/>

## ✔ 핵심 기능
### 검색 버튼 클릭
```javascript
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
```
### 뉴스 업데이트
```javascript
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
```
### 뉴스 스크랩
```javascript
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
```
### 뉴스 요약
```javascript
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
```
### 다음 버튼 및 이전 버튼
```javascript
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

const previousBtn = document.getElementById('previous');
previousBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    display();
  }
});
```
<br/>
<br/>

## 🎯 트러블 슈팅

### 1. 뉴스 요약 기능 개선

- 문제 상황 : 네이버 뉴스 검색 API를 사용하여 기사를 검색했을 때 기사 내용을 요약하는 description 요소의 정보가 충분하지 않다는 의견이 있었습니다.

- 해결 방안 : 요약 API를 추가로 활용하여 기사 내용을 더욱 세밀하게 요약하였습니다.

<br/>

### 2. 뉴스 본문 크롤링

- 문제 상황 : 뉴스 페이지 본문을 추출하려고 fetch API와 브라우저 내장 객체인 DOMParser를 사용하려 했습니다. 하지만 CORS 정책 이슈로 인해 데이터 추출에 제한이 있었습니다.

- 해결 방안 : 서버 사이드에서 웹 크롤링을 수행할 수 있는 Puppeteer 라이브러리를 Express에 적용하였습니다. Puppeteer는 브라우저 환경에서 동작하는 JavaScript 코드를 서버 측에서 실행할 수 있게 하여 CORS 문제를 우회할 수 있었습니다.

<br/>

### 3. 뉴스 본문 태그 일관성 부족

- 문제 상황 : 각 언론사의 웹페이지 구조가 달랐습니다.
  네이버 기사는 뉴스 본문이 주로 'article' 태그 안에 위치해 있었으나 다른 기사에서는 'p' 또는 'div' 태그에 담겨있는 등 뉴스 본문을 포함하고 있는 HTML 태그가 일관성이 없었습니다.
  이로 인해 기사 내용을 추출하는 데 어려움이 있었습니다.

- 해결 전략 : 웹페이지 URL에 'naver' 문자열이 포함된 경우에만 데이터를 수집하도록 설정하여 네이버 뉴스만을 대상으로 크롤링하였습니다.

  <br/>
  <br/>

## 🔎 ESLint 규칙 및 적용 후기

<br/>
<br/>

## 😀 느낀 점
- 김유은 : api를 연동할 때는 api문서를 잘 참고하여 요구되는 파라미터와 형식 등을 잘 지키는 것이 매우 중요함을 느꼈습니다.

- 김남혁 : open api를 활용하여 하나의 웹 페이지를 만들 때 어떤 식으로 요청과 응답이 오고 가는지 구조를 파악할 수 있었습니다. 또한, 이해 및 코드 진행의 속도가 많이 느리기 때문에 익숙해질 때까지 더 많은 노력이 필요하다고 생각했습니다.

- 김지관 : 원하는 텍스트 부분을 가져오기 위해 웹 스크래핑을 활용하였는데 혼용해서 사용하고 있던 크롤링과 스크래핑의 차이를 알게 되었고 무단 사용시 불법이라는 것을 알게 되었습니다.

- 이진천 : git을 공부하고 활용할 수 있는 좋은 경험이었고, node.js 환경에서 Web API를 사용할 수 있는 방법을 알게 되었습니다.
