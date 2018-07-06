import * as canvasActionTypes from "../actionType/actionType";

export const updateObject = object => {
  return dispatch => {
    dispatch({ type: canvasActionTypes.UPDATE_OBJECT, object: object });
  };
};
