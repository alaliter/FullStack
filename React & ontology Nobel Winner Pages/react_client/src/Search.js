import React, { Component } from 'react';
import {
  Route,
  Link,
  NavLink,
  withRouter,
  HashRouter
} from "react-router-dom";
import Select from 'react-select';
import axios from 'axios';

const options = [{value: 'physics',label: 'Physics'}, {value: 'chemistry',label: 'Chemistry'}, 
{value: 'medicine',label: 'Medicine'}, {value: 'literature',label: 'Literature'}, 
{value: 'peace',label: 'Peace'}, {value: 'economics', label: 'Economic Sciences'}];

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      category: '',
      winners: [{name:''}],
      searchValue: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChangeYear(e) {
    this.setState({year: e.target.value})
  }

  handleChangeCategory(selectedOption) {
    this.setState({category: selectedOption})
  }

  async handleSubmit() {
    const {data: winners} = await axios.get('http://tinman.cs.gsu.edu:5001/nobel/' + this.state.year + '/' + this.state.category.value);
    this.setState({winners});
  }

  async handleClick(e) {
    // alert(e.target.id)
    const {data: searchValue} = await axios.get('http://tinman.cs.gsu.edu:5001/nobel/' + e.target.id);
    this.props.history.push({pathname: '/Winner', state: searchValue});
  }  

  render() {
    const {selectedOption} = this.state.category;
    const winners = this.state.winners;
    return (
      <div>
        <p>If you can not load any data, please submit it again! You will get the right information you want!</p>
        <form>
          <label>
            Year 1901 to 2007:<input name="year" onChange={this.handleChangeYear}/>
          </label>
          <div className="w-25">
            <Select value={selectedOption} onChange={this.handleChangeCategory} options={options}/>
          </div>
          <br/>
          <input type="submit" onClick={this.handleSubmit}/>
        </form>
        <br/>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Winner Name</th>
              <th scope="col">Year</th>
              <th scope="col">category</th>
            </tr>
          </thead>
          <tbody>          
              {
                winners.map((el)=>{
                  return <tr> <td><a href="#" id={el.winner} onClick={this.handleClick}>{el.winner}</a></td>
                              <td>{el.year}</td>
                              <td>{el.category}</td>
                        </tr>;
                })
              }            
          </tbody>
        </table>  
    </div>
    );
  }
}
export default withRouter(Search)
// export { exportValue }

