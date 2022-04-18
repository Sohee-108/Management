/**
 * 터미널에서 node server.js 실행시 5000번 포트가 이미 사용중이라는 에러 발생
 * MacOS Monterey에서 발생하는 오류로 AirPlay 서비스를 모두 체크 해제 후 진행
 * sudo lsof -i :5000
 * 명령어를 통해 포트 사용 여부도 확인 가능
 * */

const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});
connection.connect();

app.get("/api/customers", (req, res) => {
  connection.query("SELECT * FROM CUSTOMER", (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
