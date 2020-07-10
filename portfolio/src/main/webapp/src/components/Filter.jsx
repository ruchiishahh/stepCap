import React, { Component } from "react";

class Filter extends Component {

  render() {
    return <button 
    onClick={() => {this.props.onClick(this.props.filter.id)}}
    className="filter btn btn-sm btn-outline-success btn-rounded waves-effect">
      {this.props.filter.text}
    </button>;
  }
}

export default Filter;
