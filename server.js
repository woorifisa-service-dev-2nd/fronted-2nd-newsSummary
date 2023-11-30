const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

const client_id = 'Qkyy4XTgioYjHDzXT0sZ';
const client_secret = 'u_fN42dyIW';

app.get('/', (req, res) => {
    console.log(res);
  //res.sendFile('index.html');
});

app.get('/search/news', function (req, res) {
  const api_url = `https://openapi.naver.com/v1/search/news?query=${encodeURI(
    req.query.query,
  )}`; // JSON 결과
  const request = require('request');
  const options = {
    url: api_url,
    headers: {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_secret,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
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