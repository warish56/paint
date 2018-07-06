import React, { Component } from "react";

import Canvas from "./containers/components/canvas/Canvas";
import Pallete from "./containers/components/pallete/Pallete";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App conatiner p-1">
        <div className="row ">
          <div className="col-2">
            <Pallete />
          </div>
          <div className="col-10">
            <Canvas />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
