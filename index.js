// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', function(req, res) {
  const ipaddress = req.ip; // 获取客户端 IP 地址
  const language = req.headers['accept-language']; // 获取语言首选项
  const software = req.headers['user-agent']; // 获取用户代理信息
  
  res.json({
    ipaddress,
    language,
    software
  });
});

const PORT = process.env.PORT || 3000;
const listener = app.listen(PORT, function() {
  console.log('Your app is listening on port ' + PORT);
});
