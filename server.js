const express = require('express');
const request = require('request');
const dotenv = require('dotenv');

const app = express();

app.use(express.static('public'));
app.use(express.json());

require('dotenv').config();

dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENt_SECRET;

app.get('/', (req, res) => {
  console.log(res);
  // res.sendFile('index.html');
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

app.listen(3000, function () {
  console.log(
    'http://127.0.0.1:3000/search/shop?query=검색어 app listening on port 3000!',
  );
});
