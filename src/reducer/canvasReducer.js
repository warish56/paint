import * as canvasActionType from "../actions/actionType/actionType";

let initialState = {
  object: null
};

let updateObject = (state, action) => {
  console.log("action store " + action.object);

  return {
    ...state,
    object: action.object
  };
};

let CanvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case canvasActionType.UPDATE_OBJECT:
      return updateObject(state, action);

    default:
      return state;
  }
};

export default CanvasReducer;
