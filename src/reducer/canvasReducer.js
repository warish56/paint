import * as canvasActionType from "../actions/actionType/actionType";

let initialState = {
  object: null,
  color: "#000000"
};

let updateObject = (state, action) => {
  console.log("action store " + action.object);

  return {
    ...state,
    object: action.object
  };
};

let updateColor = (state, action) => {
  return {
    ...state,
    color: action.color
  };
};

let CanvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case canvasActionType.UPDATE_OBJECT:
      return updateObject(state, action);

    case canvasActionType.UPDATE_COLOR:
      return updateColor(state, action);

    default:
      return state;
  }
};

export default CanvasReducer;
