import ReactDOM from "react-dom";
import Main from "./Main";
import React, { Component } from "react";
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import Winner from "./Winner";
import "./index.css";

const routing = (<Router>
  <div className="container">
    <Link to="/"></Link>
    <Switch>
      <Route exact path="/" component={Main}/>
      <Route path="/Winner" component={Winner}/>
    </Switch>
  </div>
</Router>)

ReactDOM.render(
  routing,
  document.getElementById("root")
);