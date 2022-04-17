import React, { useState, useEffect } from "react";
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

function App(props) {
  const { classes } = props;

  const [customers, setCustomers] = useState("");

  const callApi = async () => {
    const response = await fetch("./api/customers");
    const body = await response.json();
    return body;
  };

  useEffect(() => {
    callApi()
      .then((res) => {
        setCustomers(res);
      })
      .catch((err) => console.log(err));
    console.log(customers);
  }, []);

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
          {customers
            ? customers.map((c) => {
                return (
                  <Customer
                    key={c.id}
                    {...c}
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                  />
                );
              })
            : ""}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(App);
