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
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import "./App.css";
import Customer from "./component/Customer";
import CustomerAdd from "./component/CustomerAdd";

const styles = (theme) => ({
  root: {
    width: "100%",
    minWidth: 1080,
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    marginLeft: 18,
    marginRight: 18,
    marginBottom: 80,
  },
  progress: {
    margin: theme.spacing * 2,
  },
  grow: {
    flexGrow: 1,
  },
  tableHead: {
    fontSize: "1.0rem",
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
});

function App(props) {
  const [customers, setCustomers] = useState("");
  const [completed, setCompleted] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
  const [inputs, setInputs] = useState({
    searchKeyword: "",
  });
  const { searchKeyword } = inputs;
  const { classes } = props;
  const cellList = [
    "??????",
    "????????? ?????????",
    "??????",
    "????????????",
    "??????",
    "??????",
    "??????",
  ];

  const filteredComponents = (data) => {
    data = data.filter((c) => {
      return c.name.indexOf(searchKeyword) > -1;
    });
    return data.map((c) => {
      return (
        <Customer
          stateRefresh={stateRefresh}
          key={c.id}
          id={c.id}
          image={c.image}
          name={c.name}
          birthday={c.birthday}
          gender={c.gender}
          job={c.job}
        />
      );
    });
  };

  const stateRefresh = () => {
    setCustomers("");
    setCompleted(0);
    searchKeyword("");
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

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      //???????????? ???????????? ????????? ????????? ????????????.
      ...inputs,
      [name]: value,
    };
    setInputs(nextInputs);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            ?????? ?????? ?????????
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}></div>
            <InputBase
              placeholder="????????????"
              classes={{ root: classes.inputRoot, input: classes.inputInput }}
              name="searchKeyword"
              value={searchKeyword}
              onChange={handleValueChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.menu}>
        <CustomerAdd stateRefresh={stateRefresh} />
      </div>
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              {cellList.map((c) => {
                return <TableCell className={classes.tableHead}>{c}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers ? (
              filteredComponents(customers)
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
    </div>
  );
}

export default withStyles(styles)(App);
