import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import * as actions from "../actions/populateCombo";


const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 230,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});

const initialFieldValues = {
  customerID: "",
  mortgageType: "",
  amount: "",
  paymentType: "",
};

const PopulateCombo = ({ classes, ...props }) => {
  const { addToast } = useToasts();


  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues,  props.setCurrentId);

  //material-ui select
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);


  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.dCandidateList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  return (
    <div>
      <Select
        name="paymentType"
        value={values.paymentType}
        onChange={handleInputChange}
        labelWidth={labelWidth}
        displayEmpty
      >
        <MenuItem value="">Select Payment Type</MenuItem>
        <MenuItem value="Monthly">Monthly</MenuItem>
        <MenuItem value="Yearly">Yearly</MenuItem>
      </Select>
    </div>
  );
};

const mapStateToProps = (state) => ({
  populateComboList: state.dCandidate.list,
});

const mapActionToProps = {
  fetchAllMortgageType: actions.fetchAllMortgageType,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(PopulateCombo));
