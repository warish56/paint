import React from "react";
import { connect } from "react-redux";

import {
  ReactangleObject,
  circleObject,
  PathObject
} from "../../../actions/canvasPrototypes";

import { updateObject } from "../../../actions/canvasActions/canvasActions";

import "./canvas.css";

class Canvas extends React.Component {
  state = {
    shape: null,
    position: {
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0
    },
    canvas: []
  };

  checkObject = () => {
    switch (this.props.object) {
      case "select":
        this.selectObject();
        break;
      case "rectangle":
        this.drawRectangle();
        break;
      case "circle":
        this.drawCircle();
        break;
      case "pencil":
        this.drawPath();
        break;
    }
  };

  updateCanvas = obj => {
    let newCanvas = [...this.state.canvas];
    newCanvas.push(obj);
    this.setState({
      canvas: newCanvas
    });
  };

  updateStartPosition = async event => {
    let newPosition = {
      ...this.state.position,
      startX: +event.pageX - 835,
      startY: event.pageY - 10
    };

    await this.setState({
      position: newPosition
    });

    // this.updatePoints(1);
  };

  updateEndPosition = async event => {
    let newPosition = {
      ...this.state.position,
      endX: +event.pageX - 835,
      endY: +event.pageY - 10
    };

    await this.setState({
      position: newPosition
    });
    this.checkObject();
  };

  updatePoints = (x, y) => {
    let circle = circleObject({
      x: x,
      y: y,
      radius: 10
    });
    this.updateCanvas(circle);
  };

  getPaylaod = () => {
    return {
      x: this.state.position.startX,
      y: this.state.position.startY,
      ex: this.state.position.endX,
      ey: this.state.position.endY
    };
  };

  selectObject = () => {
    this.state.canvas.map(object => {
      if (
        this.state.position.startX >= object.x &&
        this.state.position.endX <= object.ex &&
        this.state.position.startY >= object.y &&
        this.state.position.endY <= object.ey
      ) {
        console.log(true);
        this.updatePoints(object.x, object.y);
        this.updatePoints(object.ex, object.y);
        this.updatePoints(object.ex, object.ey);
        this.updatePoints(object.x, object.ey);
      }
    });
  };

  drawRectangle = () => {
    let payload = this.getPaylaod();
    let newReactangle = ReactangleObject(payload);
    this.updateCanvas(newReactangle);
    this.props.updateObjectToNull();
  };

  drawCircle = () => {
    let payload = this.getPaylaod();
    let newCircle = circleObject(payload);
    this.updateCanvas(newCircle);
    this.props.updateObjectToNull();
  };

  drawPath = () => {
    let payload = this.getPaylaod();
    const path = `
      ${this.state.position.startX} 
     ${this.state.position.startY} 
      H
      ${this.state.position.endX - this.state.position.startX}`;
    let newPath = PathObject({ ...payload, path: path });
    console.log(path);
    this.updateCanvas(newPath);
    //this.updatePoints(0);
    //this.props.updateObjectToNull();
  };

  componentDidMount() {
    window.addEventListener("mousemove", event => {
      let newPosition = {
        ...this.state.position,
        x: +event.pageX,
        y: +event.pageY
      };

      this.setState({
        position: newPosition
      });
    });
  }

  render = () => {
    let elements = this.state.canvas.map((item, index) => {
      return item.value;
    });
    return (
      <div className=" p-1">
        <svg
          id="svg"
          onMouseDown={this.updateStartPosition}
          onMouseUp={this.updateEndPosition}
          width="500px"
          height="500px"
        >
          {elements}
        </svg>

        <p>x : {this.state.position.x} </p>
        <p> y :{this.state.position.y}</p>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    object: state.canvas.object
  };
};

let mapDispatchToProps = dispatch => {
  return {
    updateObjectToNull: () => dispatch(updateObject(null))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);
