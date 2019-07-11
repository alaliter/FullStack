import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Nations from "./Nations";
import Years from "./Years";
import Categories from "./Categories";
import Search from "./Search";
import Winner from "./Winner";
import logo from './nobel.jpg';

 class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div className="container">

        <img src={logo} alt="logo" style={{alignSelf: 'right', position: 'relative', height: 200, borderRadius: 75}} resizeMode="contain" />
          <nav className="navbar navbar-expand-lg navbar-light bg-warning">
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item"><NavLink exact to="/Home"><a className="nav-link">Home</a></NavLink></li>
                <li className="nav-item"><NavLink to="/Nations"><a className="nav-link">Nation</a></NavLink></li>
                <li className="nav-item"><NavLink to="/Categories"><a className="nav-link">Category</a></NavLink></li>
                <li className="nav-item"><NavLink to="/Years"><a className="nav-link">Year</a></NavLink></li> 
                <li className="nav-item"><NavLink to="/Search"><a className="nav-link">Search</a></NavLink></li> 
              </ul>
            </div>
          </nav>

          <div className="content">
            <br/>
            <h4>Project 5 about Nobel Winners!</h4>
            <br/>
            <Route exact path="/Home" component={Home}/>
            <Route path="/Nations" component={Nations}/>
            <Route path="/Years" component={Years}/>
            <Route path="/Categories" component={Categories}/>
            <Route path="/Search" component={Search}/>
            <Route path="/Winner" component={Winner}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default Main;