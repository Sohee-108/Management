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

const multer = require("multer");
const upload = multer({ dest: "./upload" });

app.get("/api/customers", (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.use("/image", express.static("./upload"));

app.post("/api/customers", upload.single("image"), (req, res) => {
  let sql = "INSERT INTO CUSTOMER VALUES (null, ?,?,?,?,?,now(),0)";
  let image = "/image/" + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.delete("/api/customers/:id", (req, res) => {
  let sql = "UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
