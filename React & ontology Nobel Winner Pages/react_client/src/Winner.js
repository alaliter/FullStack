import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Winner extends React.Component {
  constructor() {
    super();
  }
  

  render() {
    // console.log('this.props.location', this.props.location);
    return (
      <div>
        <h5>The details about the winner</h5><br/>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Key</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>         
              <tbody>
                  <tr>
                    <td>Name</td><td>{this.props.location.state.name}</td>
                  </tr>
                  <tr>
                    <td>Year</td><td>{this.props.location.state.year}</td>
                  </tr>
                  <tr>
                    <td>category</td><td>{this.props.location.state.category}</td>
                  </tr>
                  <tr>
                    <td>Association</td><td>{this.props.location.state.association}</td>
                  </tr>
                  <tr>
                    <td>Country</td><td>{this.props.location.state.country}</td>
                  </tr>
                  <tr>
                    <td>Birthday</td><td>{this.props.location.state.dob}</td>
                  </tr>
                  <tr>
                    <td>Motive</td><td>{this.props.location.state.motive}</td>
                  </tr>
              </tbody>       
        </table>       
      </div>
    );
  }
}
export default withRouter(Winner)
