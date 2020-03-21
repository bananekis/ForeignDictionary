import {combineReducers} from "redux";
import {isLoggedIn} from "./isLoggedIn";
import {dictionaries} from "./dictionaries";

export const Actions = {
  DictionaryAdded: 'DictionaryAdded',
  DictionariesInitialized: 'DictionariesInitialized',
  IsSignedInLoaded: 'IsSignedInLoaded',
  SignIn: 'SignIn',
  SignOut: 'SignOut',
};

export const rootReducer = combineReducers({
  isLoggedIn,
  dictionaries,
});