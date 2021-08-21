import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/mortageActions";
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
import MortgageForm from "./MortgageForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

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

const MortgageDetails = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    console.error("Mortgage useEffects");
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
      <Grid container>
        <Grid item xs={6}>
          <MortgageForm {...{ currentId, setCurrentId }} />
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    dCandidateList: state.dCandidate.list,
    currentCustmer: state.dCandidate.CurrentCustmer,
  };
};

const mapActionToProps = {
  fetchAllDCandidates: actions.fetchAll,
  deleteDCandidate: actions.Delete,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(MortgageDetails));
