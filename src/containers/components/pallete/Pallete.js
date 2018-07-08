import React from "react";
import { SketchPicker } from "react-color";

import * as canvasActions from "../../../actions/canvasActions/canvasActions";

import { connect } from "react-redux";

class Pallete extends React.Component {
  state = {
    background: "#fff",
    color: false
  };

  onChangeColor = color => {
    this.setState({
      background: color.hex
    });
    this.props.updateObjectInStore("palette");
    console.log(color.hex);
    this.props.updateColorInStore(color.hex);
  };

  toogleColorPicker = () => {
    this.setState({
      color: !this.state.color
    });
  };

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

        <button
          onClick={() => this.props.updateObjectInStore("triangle")}
          type="button"
          className=""
        >
          <span className="fa fa-caret-up" />
        </button>

        <button
          onClick={() => this.props.updateObjectInStore("eraser")}
          type="button"
          className=""
        >
          <span className="fa fa-eraser" />
        </button>

        <button onClick={this.toogleColorPicker} type="button" className="">
          <span className="fa fa-palette" />
        </button>
        {this.state.color ? (
          <SketchPicker
            color={this.state.background}
            onChangeComplete={this.onChangeColor}
          />
        ) : null}
      </div>
    );
  }
}

let mapDispatchToProps = dispatch => {
  return {
    updateObjectInStore: object => dispatch(canvasActions.updateObject(object)),
    updateColorInStore: color => dispatch(canvasActions.updateColor(color))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Pallete);
