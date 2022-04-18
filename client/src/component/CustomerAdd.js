import React, { useState } from "react";
import { post } from "axios";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  withStyles,
} from "@material-ui/core";

const styles = (theme) => ({
  hidden: {
    display: "none",
  },
});

function CustomerAdd(props) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    birthday: "",
    gender: "",
    job: "",
  });
  const { username, birthday, gender, job } = inputs;
  const [open, setOpen] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault(); // 데이터가 서버로 전달됨으로써 오류가 발생하지 않도록 함
    addCustomer().then((response) => {
      console.log(response.data);
      props.stateRefresh();
    });
    setFile(null);
    setFileName("");
    setInputs({ username: "", birthday: "", gender: "", job: "" });
    setOpen(false);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFile(null);
    setFileName("");
    setInputs({ username: "", birthday: "", gender: "", job: "" });
    setOpen(false);
  };

  const { classes } = props;

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        고객 추가하기
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>고객 추가</DialogTitle>
        <DialogContent>
          <input
            className={classes.hidden}
            accept="image/*"
            id="raised-button-file"
            type="file"
            file={file}
            value={fileName}
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              name="file"
            >
              {fileName === "" ? "프로필 이미지 선택" : fileName}
            </Button>
          </label>
          <br />
          <TextField
            label="이름"
            type="text"
            name="username"
            value={username}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="생년월일"
            type="text"
            name="birthday"
            value={birthday}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="성별"
            type="text"
            name="gender"
            value={gender}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="직업"
            type="text"
            name="job"
            value={job}
            onChange={handleValueChange}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            추가
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(CustomerAdd);
