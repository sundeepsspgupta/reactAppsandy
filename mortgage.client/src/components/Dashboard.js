import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dashboard";
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
  ButtonGroup,
  Button,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import MortgageForm from "./MortgageForm";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

const DashBoard = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchAllDCandidates();
  }, []); //componentDidMount

  //toast msg.
  const { addToast } = useToasts();

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteDCandidate(id, () =>
        addToast("Deleted successfully", { appearance: "info" })
      );
  };

  const onMortgagePage = (id) => {
    if (window.confirm("Have you saved the record?"))
      props.deleteDCandidate(id, () =>
        addToast("Deleted successfully", { appearance: "info" })
      );
  };

  return (
    <Paper className={classes.paper} elevation={3}>
      Customer Name: "Sundeep Gupta"
      <br />
      {/* <DCandidateForm {...{ currentId, setCurrentId }} /> */}
      <Grid container>
        <Grid item xs={6}>
          {/* <MortgageForm {...{ currentId, setCurrentId }} /> */}
        </Grid>
        <Grid item xs={10}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>MortgageType</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>PaymentType</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody styles={"height: 400px; overflow: scroll;"}>
                {props.dCandidateList.map((record, index) => {
                  return (
                    <TableRow key={index} hover>
                      {/* <TableCell>{record.customerID}</TableCell> */}
                      <TableCell>{record.mortgageType}</TableCell>
                      <TableCell>{record.amount}</TableCell>
                      <TableCell>{record.paymentType}</TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button>
                            <EditIcon
                              color="primary"
                              // onClick={() => {
                              //   (event) => (window.location.href = "/Mortgage"),
                              //     props.SetCurrentMortgage(record),
                              //     setCurrentId(record.id);
                              // }}
                              onClick={(event) =>
                                (window.location.href = "/Mortgage")
                              }
                            ></EditIcon>
                          </Button>
                          {/* <Button
                            style={{ float: "right" }}
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                          >
                            {/* {" "}
                            <Link to="/Mortgage">
                              {" "}
                              NEXT MMMM {props.currentCustmer.fullName}
                            </Link> */}
                          {/* </Button> */}
                          <Button> 
                            <DeleteIcon
                              color="secondary"
                              onClick={() => onDelete(record.id)}
                            />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableHead className={classes.root}>
                <br />
                <br />
                {/* {/* <Button onClick={()=> history.push("/mypage")}>Click me!</Button> */}
                {/* <Button
                  style={{ float: "right" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.smMargin}
                >
                  {" "}
                  <Link to="/Mortgage"> NEXT </Link>
                </Button> */}
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  dCandidateList: state.dCandidate.list,
});

// const mapStateToProps = (state) => {
//   console.log(state)
//   return {
// dCandidateList: state..list,
// currentCustmer: state.dCandidate.CurrentCustmer,
// };
// };

const mapActionToProps = {
  fetchAllDCandidates: actions.fetchAll,
  deleteDCandidate: actions.Delete,
  SetCurrentMortgage: actions.SetCurrentMortgage,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(DashBoard));
