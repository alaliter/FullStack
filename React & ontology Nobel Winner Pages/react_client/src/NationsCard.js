import React from 'react';

class NationsCard extends React.Component{

  render() {
    return(
      <div>
      	<a className="list-group-item list-group-item-action" 
      	id={this.props.info.nation} data-toggle="list" 
      	href="#list-home" role="tab" aria-controls="home"
      	onClick={this.props.handleClick}>
      	{this.props.info.nation}</a>
      </div>
    );
  }
}

export default NationsCard;
