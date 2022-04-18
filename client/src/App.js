import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  withStyles,
  CircularProgress,
} from "@material-ui/core";

import "./App.css";
import Customer from "./component/Customer";
import CustomerAdd from "./component/CustomerAdd";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
  progress: {
    margin: theme.spacing * 2,
  },
});

function App(props) {
  const { classes } = props;

  const [customers, setCustomers] = useState("");
  const [completed, setCompleted] = useState(0);
  const [isLoad, setIsLoad] = useState(false);

  const stateRefresh = () => {
    setCustomers("");
    setCompleted(0);
    callApi()
      .then((res) => {
        setCustomers(res);
      })
      .catch((err) => console.log(err));
  };

  const callApi = async () => {
    const response = await fetch("./api/customers");
    const body = await response.json();
    return body;
  };

  const progress = () => {
    let complete = 0;
    let timer = setInterval(() => {
      if (complete >= 100) {
        complete = 0;
      } else {
        complete += 1;
      }
      setCompleted(complete);
      if (isLoad) {
        clearInterval(timer);
      }
    }, 20);
  };

  useEffect(() => {
    progress();
    callApi()
      .then((res) => {
        setCustomers(res);
      })
      .catch((err) => console.log(err));
  }, [isLoad]);

  // const progress = () => {
  //   setCompleted(completed >= 100 ? 0 : completed + 1);
  // };

  // useEffect(() => {
  //   var timer = setInterval(progress(), 20);
  //   callApi()
  //     .then((res) => {
  //       setCustomers(res);
  //     })
  //     .catch((err) => console.log(err));
  //   return clearInterval(timer);
  // }, [completed]);

  return (
    <div>
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
            {customers ? (
              customers.map((c) => {
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
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress
                    className={classes.progress}
                    variant="determinate"
                    value={completed}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateRefresh={stateRefresh} />
    </div>
  );
}

export default withStyles(styles)(App);
