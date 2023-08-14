import { combineReducers } from 'redux';
import { RESET_STORE } from '../types';
import EventReducer from './EventReducers';
import WeekyHoursReducer from './WeeklyHoursReducer';
const rootReducer = combineReducers({
  Event: EventReducer,
  WeeklyHours: WeekyHoursReducer,
});

const rootReducerBridge = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return rootReducer(state, action);
};

export default rootReducerBridge;
