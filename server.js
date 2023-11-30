// 네이버 검색 API 예제 - 블로그 검색
const express = require('express');
const app = express();
const client_id = 'xoXcqktQUwnAk5c8aRxf';
const client_secret = '5T9DuCDtUZ';

app.use(express.static('public'))
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile("index.html")
})

app.get('/search/news', function (req, res) {
  console.log(req.body);
  const api_url = 'https://openapi.naver.com/v1/search/news?query=' + encodeURI(req.query.query); // JSON 결과
  const request = require('request');
  
  const query = req.body
  

  const options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret,
       "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
    };


   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });

 
 app.listen(3000, function () {
   console.log('http://127.0.0.1:3000/ app listening on port 3000!');
 });