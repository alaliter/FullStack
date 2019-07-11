import React, { Component } from "react";
import {withRouter, Link} from 'react-router-dom';
import YearsCard from './YearsCard';
import axios from 'axios';

const API = 'http://tinman.cs.gsu.edu:5001/nobel/years';

class Years extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      winners: [{}]
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
  }

  async handleClick(e) {
    // alert(e.target.id)
    const {data:winners} = await axios.get('http://tinman.cs.gsu.edu:5001/nobel/years/'+e.target.id);
    this.setState({winners})
    // alert(this.state.winners[0].winner)
  }

  async handleClick1(e) {
    // alert(e.target.id)
    const {data: searchValue} = await axios.get('http://tinman.cs.gsu.edu:5001/nobel/' + e.target.id);
    this.props.history.push({pathname: '/Winner', state: searchValue});
  }  


  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ info: data }));
  }

  renderInfo() {
    let h = this.handleClick.bind(this);
    let Info_list = this.state.info.map(function(el) {
      return(
          <YearsCard info={el} handleClick={h}/>
      );
    });

    return(
      this.state.info.length
      ? Info_list
      : (<div id='msg-app-loading'>
          Loading
        </div>)
    );
  }

  
  render() {
    return (
      <div>
        <h3>All Years</h3>
        <div className="row">
          <div className="col-4">
            <div className="list-group" role="tablist">
              {this.renderInfo()}   
            </div>
          </div>
          <div className="col-8">
            <div className="tab-content" id="nav-tabContent">
              <div role="tabpanel" aria-labelledby="list-home-list">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Winner Name</th>
                      <th scope="col">Year</th>
                      <th scope="col">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                          this.state.winners.map((el)=>{
                            return <tr> <td><a href="#" id={el.winner} onClick={this.handleClick1}>{el.winner}</a></td>
                                        <td>{el.year}</td>
                                        <td>{el.category}</td>
                                  </tr>;
                          })
                        }   
                  </tbody>
                </table>      
              </div>
            </div>
          </div>
        </div>  
        <br/>   
    </div>
    );
  }
}
 
export default Years;