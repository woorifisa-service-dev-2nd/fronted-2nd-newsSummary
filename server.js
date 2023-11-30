const express = require('express');
const request = require('request');
const dotenv = require('dotenv');
const puppeteer = require('puppeteer');

const app = express();

app.use(express.static('public'));
app.use(express.json());

require('dotenv').config();

dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

app.get('/', (req, res) => {
  // console.log(res);
  res.sendFile('index.html');
});

app.get('/search/news', function (req, res) {
  const apiUrl = `https://openapi.naver.com/v1/search/news?query=${encodeURI(
    req.query.query,
  )}`; // JSON 결과
  const options = {
    url: apiUrl,
    headers: {
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientSecret,
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

    return {
      news: contentElement
        ? contentElement.textContent
        : '더 이상 뉴스가 없습니다.',
    };
  });
  console.log(data);
  browser.close();
  res.send(data);
});

app.listen(3000, function () {
  console.log(
    'http://127.0.0.1:3000/search/news?query=검색어 app listening on port 3000!',
  );
});
