/**
 * 터미널에서 node server.js 실행시 5000번 포트가 이미 사용중이라는 에러 발생
 * MacOS Monterey에서 발생하는 오류로 AirPlay 서비스를 모두 체크 해제 후 진행
 * sudo lsof -i :5000
 * 명령어를 통해 포트 사용 여부도 확인 가능
 * */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/customers", (req, res) => {
  res.send([
    {
      id: 1,
      image: "https://placeimg.com/64/64/1",
      name: "박서함",
      birthday: "931028",
      gender: "남자",
      job: "배우",
    },
    {
      id: 2,
      image: "https://placeimg.com/64/64/2",
      name: "박재찬",
      birthday: "011206",
      gender: "남자",
      job: "아이돌",
    },
    {
      id: 3,
      image: "https://placeimg.com/64/64/3",
      name: "최소희",
      birthday: "000108",
      gender: "여자",
      job: "프론트엔드 개발자",
    },
  ]);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
