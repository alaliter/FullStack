import React from 'react';

class YearsCard extends React.Component{

  render() {
    return(
      <div>
      	<a className="list-group-item list-group-item-action" 
      	id={this.props.info.year} data-toggle="list" 
      	href="#list-home" role="tab" aria-controls="home"
      	onClick={this.props.handleClick}>
      	{this.props.info.year}</a>
      </div>
    );
  }
}

export default YearsCard;
