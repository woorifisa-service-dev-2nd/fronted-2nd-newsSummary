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
  await page.goto(req.body.newsLink);

  let data;

  // 네이버 기사 tagName은 두가지라 조건문으로 검증
  const articleBodyElement = await page.$('#articeBody');
  if (articleBodyElement) {
    data = await page.$eval(
      "#articeBody", (element) => {
        return { news: element.textContent };
      }
    )
  }
  else {
    const dicAreaElement = await page.$('#dic_area');
    if (dicAreaElement) {
      data = await page.$eval(
        "#dic_area", (element) => {
          return { news: element.textContent };
        })
    }
    else {

    }
  }


  // const data = await page.$eval(
  //   "#articeBody", async => {
  //     return { news: async.textContent };
  //   });

  
  console.log(data);

  browser.close();
  res.send(data);




});

app.listen(3000, function () {
  console.log(
    'http://127.0.0.1:3000/ app listening on port 3000!',
  );
});

