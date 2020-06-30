import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import RequestingReducer from './requesting/RequestingReducer';

export default (history) => {
  const reducerMap = {
    requesting: RequestingReducer.reducer,
    router: connectRouter(history),
  };

  return combineReducers(reducerMap);
};
