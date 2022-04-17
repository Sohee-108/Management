import React from "react";

import "./App.css";
import Customer from "./component/Customer";

const customers = [
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
];

function App() {
  return (
    <div>
      {customers.map((c) => {
        return (
          <Customer
            key={c.id}
            id={c.id}
            image={c.image}
            name={c.name}
            birthday={c.birthday}
            gender={c.gender}
            job={c.job}
          />
        );
      })}
    </div>
  );
}

export default App;
