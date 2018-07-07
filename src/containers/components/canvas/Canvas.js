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
    position: {
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0
    },
    canvas: [],
    objectSelectedIndex: null
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

  //  updating Small circle as points on the object
  updatePoints = (x, y) => {
    let circle = circleObject({
      x: x,
      y: y,
      radius: 10
    });
    this.updateCanvas(circle);
  };

  //  function to get payload for every object on canvas
  getPaylaod = () => {
    return {
      x: this.state.position.startX,
      y: this.state.position.startY,
      ex: this.state.position.endX,
      ey: this.state.position.endY
    };
  };

  //  executed when and object is selected
  selectObject = () => {
    this.state.canvas.map((object, index) => {
      if (this.clickedInsideTheElemnt(object, object.type)) {
        console.log(true);
        this.updatePoints(object.x, object.y);
        this.updatePoints(object.ex, object.y);
        this.updatePoints(object.ex, object.ey);
        this.updatePoints(object.x, object.ey);

        this.setState({
          objectSelectedIndex: index
        });
      }
    });
  };

  //  checks whether the mouse click is inside any object of canvas or not
  clickedInsideTheElemnt = (object, type) => {
    switch (type) {
      case "rectangle":
        return (
          this.state.position.startX >= object.x &&
          this.state.position.endX <= object.ex &&
          this.state.position.startY >= object.y &&
          this.state.position.endY <= object.ey
        );

      case "circle":
        return (
          this.state.position.endX <= object.ex &&
          this.state.position.endY < object.ey + (object.ex - object.x) &&
          this.state.position.endY > object.ey - (object.ex - object.x)
        );
    }
  };

  //  calculates new end position when select tool is selected
  claculate_New_End_Position_On_Select = async event => {
    console.log("New end called");

    let newPosition = {
      ...this.state.position,
      endX: event.pageX - 835,
      endY: event.pageY - 10
    };
    await this.setState({
      position: newPosition
    });

    this.updateElement();
  };

  //  updates the element whwnever select tool is selected
  updateElement = () => {
    let payload = {
      ...this.state.canvas[this.state.objectSelectedIndex]
    };
    console.log(payload);

    let object = this.state.canvas[this.state.objectSelectedIndex].type;
    console.log(object);
    let newCanvas = null;
    switch (object) {
      case "rectangle":
        newCanvas = this.updateRectangle(payload);
        break;
      case "circle":
        newCanvas = this.updateCircle(payload);
        break;
    }

    this.setState({
      canvas: newCanvas,
      objectSelectedIndex: null
    });
  };

  updateCircle = payload => {
    let newPayload = {
      ...payload,
      ex: this.state.position.endX,
      ey: this.state.position.endY
    };

    let newObject = circleObject(newPayload);

    console.log(newObject);
    let newCanvas = [...this.state.canvas];
    newCanvas[this.state.objectSelectedIndex] = newObject;

    return newCanvas;
  };

  updateRectangle = payload => {
    let newPayload = {
      ...payload,
      ex: this.state.position.endX,
      ey: this.state.position.endY
    };

    if (newPayload.ex - newPayload.x < 0) {
      newPayload.x = this.state.canvas[this.state.objectSelectedIndex].ex;
      let temp = newPayload.ex;
      newPayload.ex = newPayload.x;
      newPayload.x = temp;
    }

    if (newPayload.ey - newPayload.y < 0) {
      newPayload.y = this.state.canvas[this.state.objectSelectedIndex].ey;
      let temp = newPayload.ey;
      newPayload.ey = newPayload.y;
      newPayload.y = temp;
    }

    let newObject = ReactangleObject(newPayload);
    let newCanvas = [...this.state.canvas];
    newCanvas[this.state.objectSelectedIndex] = newObject;

    return newCanvas;
  };

  //  updates the canvas by adding objects to it
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
    console.log("end called");
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

  drawRectangle = () => {
    let payload = this.getPaylaod();
    if (payload.ex - payload.x < 0) {
      let temp = payload.ex;
      payload.ex = payload.x;
      payload.x = temp;
    }

    if (payload.ey - payload.y < 0) {
      let temp = payload.ey;
      payload.ey = payload.y;
      payload.y = temp;
    }

    let newReactangle = ReactangleObject(payload);
    this.updateCanvas(newReactangle);
    this.props.updateObjectToNull();
  };

  drawCircle = () => {
    let payload = this.getPaylaod();

    let radius =
      (payload.ex - payload.x > payload.ey - payload.y &&
        payload.ex - payload.x > -(payload.ey - payload.y)) ||
      (-(payload.ex - payload.x) > payload.ey - payload.y &&
        -(payload.ex - payload.x) > -(payload.ey - payload.y))
        ? payload.ex - payload.x
        : payload.ey - payload.y;
    if (radius < 0) {
      radius = -radius;
    }

    let newCircle = circleObject({ ...payload, radius: radius });
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
          onMouseUp={
            this.state.objectSelectedIndex === null
              ? this.updateEndPosition
              : this.claculate_New_End_Position_On_Select
          }
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
