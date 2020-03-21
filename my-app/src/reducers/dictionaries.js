import {Actions} from "./rootReducer";

export const dictionaries = (state = [], action) => {
  switch (action.type) {
    case Actions.DictionaryAdded:
      return [...state, action.payload.dictionary];

    case Actions.DictionariesInitialized:
      return action.payload.dictionaries;

    default:
      return state;
  }
};