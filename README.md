## 📝 프로젝트 소개

- 특정 검색어를 입력하면 그에 따른 최신 네이버 뉴스를 요약해서 제공하는 웹 서비스
- 사용한 Open API : NAVER 검색(뉴스) API, NAVER Cloud 요약 API
- 개발기간 : 2023.11.30 ~ 2023.12.02
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
![news](https://github.com/woorifisa-service-dev-2nd/fronted-2nd-musicApp/assets/65431814/ff328653-9994-453d-a045-9f87c8b462cf)

<br/>
<br/>

## 📲 도메인 용어 정의

- naverNews: url을 필터링하여 네이버 뉴스 데이터를 저장하는 배열

- currentIndex: 현재 보고 있는 뉴스의 인덱스를 저장하는 변수

- searchedNewsArray: 검색된 뉴스의 정보를 저장하는 배열

- searchBtn: 클릭 이벤트 발생 시 네이버 뉴스 검색 API에 GET 요청

- updateNews(index): 인덱스에 해당하는 뉴스를 업데이트하는 함수. 뉴스 URL을 스크래핑하여 뉴스 데이터를 가져오고 scrap함수 호출

- scrap(newsUrl): newsUrl 을 인자로 받아 POST로 스크래핑 값을 요청

- summaryBtn: 클릭 이벤트 발생 시 요약 API에 POST로 제목, 내용을 body에 넣어 내용 요약 요청

- nextBtn, previousBtn : 클릭 이벤트 발생시 인덱스를 1씩 증감시켜 현재 인덱스 전후의 기사를 출력

- display(): 현재 인덱스의 뉴스날짜, 제목, 본문을 브라우저 화면에 출력하는 함수

- cleanText(): 뉴스 본문 공백 제거 함수

- browser : puppeteer APl를 통해 백그라운드로 스크랩할 url에 접근

- requestBody : 내용 요약 API에 원하는 값을 요청하기 위해 form을 담은 변수

<br/>
<br/>

## ✔ 핵심 기능

### 1. 뉴스 검색
네이버 뉴스 검색 api를 통해 입력한 키워드에 맞는 네이버 뉴스를 최신 순으로 가져옵니다.

```javascript
// 검색 버튼
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
  const text = document.getElementById('text').value;
  const url = '/search/news';

  fetch(`${url}?query=${text}&sort=date`, { method: 'GET' })
    .then((res) => res.json())
    .then((data) => {
      naverNews = data.items.filter((item) => item.link.includes('naver')); // 'naver'가 포함된 뉴스만
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

### 2. 뉴스 업데이트
가장 최신 뉴스의 날짜, 제목, 본문을 보여줍니다.

```javascript
// 뉴스 업데이트 함수
function updateNews(index) {
  const newsUrl = naverNews[index].link;

  scrap(newsUrl).then((newsData) => {
    let searchedNews = {
      date: naverNews[index].pubDate.slice(0, 17),
      title: naverNews[index].title,
      article: newsData.news,
    };
    searchedNewsArray[currentIndex] = searchedNews;
    display();
  });
}
```

### 3. 뉴스 본문 스크래핑
puppeteer를 사용하여 뉴스 본문 내용을 스크래핑합니다.

```javascript
app.post('/scrap/news', async function (req, res) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  // waitUntil : 모든 네트워크 연결이 최소 500ms 동안 비어있을 때까지 페이지 로딩을 기다림. 페이지의 모든 요소가 로드된 후에 article 태그를 찾음
  await page.goto(req.body.newsLink, { waitUntil: 'networkidle0' });
  const data = await page.evaluate(async () => {
    // article 태그 안의 텍스트
    const contentElement =
      document.getElementsByTagName('article')[0] ||
      document.getElementById('articeBody');

    return {
      news: contentElement
        ? contentElement.textContent
        : '더 이상 뉴스가 없습니다.',
    };
  });
  browser.close();
  res.send(data);
});
```

### 4. 뉴스 요약
요약 버튼을 클릭하면 NCloud 요약 api를 사용해 뉴스 본문을 요약합니다.

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

### 5. 다음 버튼 및 이전 버튼
버튼을 클릭해 다음 or 이전 뉴스를 보여줍니다.

```javascript
javascript;
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

### 1. 뉴스 요약 기능 개선 필요

문제 상황 : 네이버 뉴스 검색 API에서 제공하는 기사 내용 요약 description의 정보가 충분하지 않았습니다.

해결 방안 : ncloud 요약 API를 추가로 연결하여 기사 내용을 더욱 세밀하게 요약하였습니다.

<br/>

### 2. 뉴스 본문 스크래핑 시 발생하는 CORS

문제 상황 : 뉴스 페이지 본문을 추출하려고 fetch API와 브라우저 내장 객체인 DOMParser를 사용하려 했습니다. 하지만 CORS 정책 이슈로 인해 데이터 추출에 제한이 있었습니다.

해결 방안 : 서버 사이드에서 웹 스크래핑을 수행할 수 있는 Puppeteer 라이브러리를 Express에 적용하였습니다. Puppeteer로 JavaScript 코드를 서버 측에서 실행할 수 있게 하여 CORS 문제를 우회했습니다.

<br/>

### 3. 뉴스 본문 태그 일관성 부족

문제 상황 : 각 언론사의 웹페이지 구조가 달랐습니다. 네이버 기사는 뉴스 본문이 주로 'article' 태그 안에 위치해 있었으나 다른 기사에서는 'p' 또는 'div' 태그에 담겨있는 등 뉴스 본문을 포함하고 있는 HTML 태그가 일관성이 없었습니다. 이로 인해 기사 내용을 추출하는 데 어려움이 있었습니다.

해결 방안 : 웹페이지 URL에 'naver' 문자열이 포함된 경우에만 데이터를 수집하도록 설정하여 네이버 뉴스만 가져왔습니다.

<br/>
<br/>

## 🔎 ESLint 규칙 및 적용 후기

'eslint-config-airbnb'를 기본 ESLint 설정으로 사용하였습니다.
이를 통해 기본적인 코드 스타일과 규칙을 유지하면서 프로젝트 진행 상황에 따라 추가적인 규칙을 적용했습니다.
코드의 일관성 및 가독성 향상으로 팀 협업에 도움이 되었습니다.

- 'operator-linebreak': off -> 연산자 위치에 대한 제한 해제
- 'no-unused-expressions': ['error', { allowTernary: true }] -> 사용되지 않는 표현식을 에러로 간주, 삼항 연산자의 사용 허용
- 'func-names': 'off' -> 함수의 명명에 대한 강제 규칙 해제
- 'no-console': 'off' -> 콘솔 사용 허용
- 'no-plusplus': 'off' -> 증감 연산자 사용 허용

<br/>
<br/>

## 😀 느낀 점

- 김유은 : api를 연동할 때는 api 문서를 참고하여 요구되는 파라미터와 형식 등을 잘 지키는 것이 매우 중요함을 깨달았습니다. 서버에서 JS코드를 실행하여 CORS를 우회할 수 있는 방법을 새로 알게 되었습니다.

- 김남혁 : open api를 활용하여 하나의 웹 페이지를 만들 때 어떤 식으로 요청과 응답이 오고 가는지 구조를 파악할 수 있었습니다. 또한, 이해 및 코드 진행의 속도가 많이 느리기 때문에 익숙해질 때까지 더 많은 노력이 필요하다고 생각했습니다.

- 김지관 : 원하는 텍스트 부분을 가져오기 위해 웹 스크래핑을 활용하였는데 혼용해서 사용하고 있던 크롤링과 스크래핑의 차이를 알게 되었고 무단 사용시 불법이라는 것을 알게 되었습니다.

- 이진천 : git을 공부하고 활용할 수 있는 좋은 경험이었고, node.js 환경에서 Web API를 사용할 수 있는 방법을 알게 되었습니다.
