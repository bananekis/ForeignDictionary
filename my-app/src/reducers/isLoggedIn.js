import {Actions} from "./rootReducer";

export const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case Actions.IsSignedInLoaded:
      return action.payload.isLoggedIn;

    case Actions.SignIn:
      return true;

    case Actions.SignOut:
      return false;

    default:
      return state;
  }
};