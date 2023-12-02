const express = require('express');
const request = require('request');
const dotenv = require('dotenv');
const puppeteer = require('puppeteer');

const app = express();

app.use(express.static('public'));
app.use(express.json());

require('dotenv').config();

dotenv.config();

const searchId = process.env.CLIENT_ID_SEARCH;
const searchSecret = process.env.CLIENT_SECRET_SEARCH;
const summaryId = process.env.CLIENT_ID_SUMMARY;
const summarySecret = process.env.CLIENT_SECRET_SUMMARY;


function cleanText(text) {
  return text
    .replace(/\t/g, ' ') // 탭을 공백으로 대체
    .replace(/\n/g, ' ') // 줄바꿈을 공백으로 대체
    .replace(/\s+/g, ' ') // 연속된 공백을 하나의 공백으로 대체
    .trim(); // 앞뒤 공백 제거
}

app.get('/', (res) => {
  res.sendFile('index.html');
});

app.get('/search/news', function (req, res) {
  const apiUrl = `https://openapi.naver.com/v1/search/news?query=${encodeURI(
    req.query.query,
  )}`; // JSON 결과
  const options = {
    url: apiUrl,
    headers: {
      'X-Naver-Client-Id': searchId,
      'X-Naver-Client-Secret': searchSecret,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log(`error = ${response.statusCode}`);
    }
  });
});

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

    return { news: contentElement ? contentElement.textContent : '더 이상 뉴스가 없습니다.' };
  });
  browser.close();
  res.send(data);
});

app.post('/summary/news', async function (req, res) {
  let title = req.body.title;
  let content = req.body.content;

  // 제목과 본문의 길이 확인
  if ((title + content).length > 2000) {
    content = content.slice(0, 2000 - title.length);
  }

  let requestBody = {
    document: {
      title: title,
      content: cleanText(content),
    },
    option: {
      language: 'ko',
      model: 'news',
      tone: 2,
      summaryCount: 3,
    },
  };
  const apiUrl = 'https://naveropenapi.apigw.ntruss.com/text-summary/v1/summarize';
  
  const summaryResponse = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'X-NCP-APIGW-API-KEY-ID': summaryId,
      'X-NCP-APIGW-API-KEY': summarySecret,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const summaryData = await summaryResponse.json();
  res.send(summaryData);
});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});