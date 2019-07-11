import React from 'react';

class CategoriesCard extends React.Component{

  render() {
    return(
      <div>
      	<a className="list-group-item list-group-item-action" 
      	id={this.props.info.category} data-toggle="list" 
      	href="#list-home" role="tab" aria-controls="home"
      	onClick={this.props.handleClick}>
      	{this.props.info.category}</a>
      </div>
    );
  }
}

export default CategoriesCard;
