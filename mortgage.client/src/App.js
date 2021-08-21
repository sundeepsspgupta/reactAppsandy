import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { store } from "./actions/store";
import { Provider } from "react-redux";
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import { Switch, Route, Router } from 'react-router-dom';

import Customer from "./components/Customer";
import MortgageDetails from "./components/MortgageDetails";
import DashboardDetails from "./components/Dashboard";

import history from "./history";

function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Router history={history}>
          <Container maxWidth="lg">
            <div>
              <h2>Mortgage Application</h2>
            </div>

            <Switch>
              <Route path="/" exact component={Customer} />
              <Route path="/Mortgage" exact component={MortgageDetails} />
              <Route path="/Dashboard" component={DashboardDetails} />
             
            </Switch>

            {/* <DCandidates /> */}
          </Container>
        </Router>
      </ToastProvider>
    </Provider>
  );
}

export default App;
