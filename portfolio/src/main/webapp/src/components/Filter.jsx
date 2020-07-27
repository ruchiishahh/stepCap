import React, { Component } from "react";

class Filter extends Component {

  componentWillUnmount() {
    console.log("Left");
  }

  getClass = () => {
    if (this.props.filter.active) {
      return "btn btn-sm btn-outline-success btn-rounded waves-effect active-filter"
    }
    return "filter btn btn-sm btn-outline-success btn-rounded waves-effect unactive-filter"
  }

  render() {
    return <button 
    onClick={() => {this.props.onClick(this.props.filter.id)}}
    className={this.getClass()}>
      {this.props.filter.text}
    </button>;
  }
}

export default Filter;
