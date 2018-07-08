import * as canvasActionTypes from "../actionType/actionType";

export const updateObject = object => {
  return dispatch => {
    dispatch({ type: canvasActionTypes.UPDATE_OBJECT, object: object });
  };
};

export const updateColor = color => {
  return dispatch => {
    dispatch({ type: canvasActionTypes.UPDATE_COLOR, color: color });
  };
};
