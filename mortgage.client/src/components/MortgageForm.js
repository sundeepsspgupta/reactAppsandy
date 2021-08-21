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
import * as actions from "../actions/mortageActions";
import { useToasts } from "react-toast-notifications";

//import PopulateMigrationTypeCombo from "./populateCombo";

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

const MortgageForm = ({ classes, ...props }) => {
  const { addToast } = useToasts();

  const validate = (fieldValues = values) => {
    let validationErrors = { ...errors };
    if ("mortgageType" in fieldValues)
      validationErrors.mortgageType = fieldValues.mortgageType
        ? ""
        : "This field is required.";
    if ("amount" in fieldValues)
      validationErrors.amount = fieldValues.amount
        ? ""
        : "This field is required.";
    if ("paymentType" in fieldValues)
      validationErrors.paymentType = fieldValues.paymentType
        ? ""
        : "This field is required.";

    setErrors({
      ...validationErrors,
    });

    if (fieldValues === values)
      return Object.values(validationErrors).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, validate, props.setCurrentId);

  //material-ui select
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully", { appearance: "success" });
      };
      if (props.currentId === 0) props.createDCandidate(values, onSuccess);
      else props.updateDCandidate(props.currentId, values, onSuccess);
    }
  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.customerList.find((x) => x.id === props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  return (
    <div>
      <form
        autoComplete="off"
        noValidate
        className={classes.formControl}
        onSubmit={handleSubmit}
      >
        <Grid container>
          <Grid item xs={3}>
            <br />
            <InputLabel className={classes.formControl} ref={inputLabel}>
              Mortgage Type
            </InputLabel>
            <br /> <br />
            <InputLabel className={classes.formControl} ref={inputLabel}>
              Amount
            </InputLabel>
            <br /> <br />
            <InputLabel className={classes.formControl} ref={inputLabel}>
              Payment Type
            </InputLabel>
            <br /> <br />
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              {/* <PopulateMigrationTypeCombo /> */}
              <TextField
                name="mortgageType"
                variant="outlined"
                label="Mortgage Type"
                value={values.mortgageType}
                onChange={handleInputChange}
                {...(errors.mortgageType && {
                  error: true,
                  helperText: errors.mortgageType,
                })}
              />
              <br />
              <TextField
                name="amount"
                variant="outlined"
                label="Amount"
                value={values.amount}
                onChange={handleInputChange}
                {...(errors.amount && {
                  error: true,
                  helperText: errors.amount,
                })}
              />
              <br />
              {/* <InputLabel ref={inputLabel}>Blood Group</InputLabel> */}
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
              {errors.paymentType && (
                <FormHelperText>{errors.paymentType}</FormHelperText>
              )}
              <br />
              {/* <TextField
                name="customerID"
                value={values.id}
                onChange={handleInputChange}
                type="hidden"
              /> */}
            </FormControl>

            <div>
              <Button
                variant="contained"
                className={classes.smMargin}
                onClick={resetForm}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.smMargin}
              >
                Submit
              </Button>
              {/* <Button
                  style={{ float: "right" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.smMargin} 
                >   <Link to='/Mortgage'> NEXT MMMM {props.currentCustmer.fullName}</Link></Button> */}
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dCandidateList: state.customer.list,
});

const mapActionToProps = {
  createDCandidate: actions.create,
  updateDCandidate: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(MortgageForm));
