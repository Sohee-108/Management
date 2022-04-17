import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  withStyles,
} from "@material-ui/core";

import "./App.css";
import Customer from "./component/Customer";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
});

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

function App(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(App);
