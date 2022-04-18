import React, { useState } from "react";
import { post } from "axios";

function CustomerAdd() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    birthday: "",
    gender: "",
    job: "",
  });
  const { username, birthday, gender, job } = inputs;

  const handleFormSubmit = (e) => {
    e.preventDefault(); // 데이터가 서버로 전달됨으로써 오류가 발생하지 않도록 함
    addCustomer().then((response) => {
      console.log(response.data);
    });
    console.log(file);
    setFile(null);
    setFileName("");
    setInputs({ username: "", birthday: "", gender: "", job: "" });
    window.location.reload();
  };

  const addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", username);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    formData.append("job", job);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.value);
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      //스프레드 문법으로 기존의 객체를 복사한다.
      ...inputs,
      [name]: value,
    };
    setInputs(nextInputs);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>고객 추가</h1>
      프로필 이미지:
      <input
        type="file"
        name="file"
        file={file}
        value={fileName}
        onChange={handleFileChange}
      />
      <br />
      이름:
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleValueChange}
      />
      <br />
      생년월일:
      <input
        type="text"
        name="birthday"
        value={birthday}
        onChange={handleValueChange}
      />
      <br />
      성별:
      <input
        type="text"
        name="gender"
        value={gender}
        onChange={handleValueChange}
      />
      <br />
      직업:
      <input type="text" name="job" value={job} onChange={handleValueChange} />
      <br />
      <button type="submit">추가하기</button>
    </form>
  );
}

export default CustomerAdd;
