import React from "react";

import * as canvasActions from "../../../actions/canvasActions/canvasActions";

import { connect } from "react-redux";

class Pallete extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column p-1 w-25 ">
        <button
          onClick={() => this.props.updateObjectInStore("select")}
          type="button"
          className=""
        >
          <span className="fa fa-mouse-pointer" />
        </button>

        <button
          onClick={() => this.props.updateObjectInStore("rectangle")}
          type="button"
          className=""
        >
          <span className="fa fa-square" />
        </button>
        <button
          onClick={() => this.props.updateObjectInStore("circle")}
          type="button"
          className=""
        >
          <span className="fa fa-circle" />
        </button>

        <button
          onClick={() => this.props.updateObjectInStore("pencil")}
          type="button"
          className=""
        >
          <span className="fa fa-pencil-alt" />
        </button>
      </div>
    );
  }
}

let mapDispatchToProps = dispatch => {
  return {
    updateObjectInStore: object => dispatch(canvasActions.updateObject(object))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Pallete);
