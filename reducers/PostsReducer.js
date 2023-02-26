import { types } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_POST_SUCCESS:
      // Copy the current state and set a new property with a dynamic key value and the payload as the value
      console.log(`Fetch success with data \n ${JSON.stringify(action,null,2)}`)
      return { ...state, [action.payload.id]: {id:0,...action.payload} };
    case types.FETCH_POSTS_SUCCESS:
      // Create a new state object that uses an AJAX request response and grabs the 'id' property from each object in the response to use as its key
      const newState2 = {};
      console.log(`yolo this the action type with its corresponding data type ${action.type}. json data ${JSON.stringify(action,null,2)}`);
      action.payload.forEach((post,index) => {
        newState2[index] = post;
      });
      return newState2;
    case types.CREATE_POST_SUCCESS:
      // Copy the current state and set a new property with a dynamic key value and the payload as the value
      console.log(types.CREATE_POST_SUCCESS)
      return { ...state, [action.payload.id]: action.payload };
    case types.DELETE_POST_SUCCESS:
      // Copy the current state and delete the property with the specified key
      const { [action.payload.id]: deletedPost, ...newState } = state;
      return newState;
    default:
      return state;
  }
};

