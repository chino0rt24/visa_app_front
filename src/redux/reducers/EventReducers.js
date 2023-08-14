import { 
    SHOW_CREATE_EVENT_SPINNER,
    LOAD_CREATE_EVENT_SUCCESS,
    LOAD_CREATE_EVENT_FAILED,
    SHOW_UPDATE_EVENT_SPINNER,
    LOAD_UPDATE_EVENT_SUCCESS,
    LOAD_UPDATE_EVENT_FAILED,
    PURGE_CREATE_EVENT,
    PURGE_UPDATE_EVENT,
    SHOW_GET_EVENTS_SPINNER,
    LOAD_GET_EVENTS_SUCCESS,
    LOAD_GET_EVENTS_FAILED,
    PURGE_GET_EVENTS
 } from '../types';

const stateEvent = {
    spinner_create: false,
    spinner_update: false,
    data_create_event: {},
    error_create_event: {},
    data_update_event: {},
    error_update_event: {},
    show_spinner_get_events: false,
    error_get_events: {},
    events: [],
};

const EventReducer = function(state = stateEvent, action) {
  switch (action.type) {
    case SHOW_CREATE_EVENT_SPINNER:
      return {
        ...state,
        spinner_create: true,
        data_create_event: {},
        error_create_event: {},
      };
    case LOAD_CREATE_EVENT_SUCCESS:
      return {
        ...state,
        spinner_create: false,
        data_create_event: action.payload,
        error_create_event: {error: false},
      };
    case LOAD_CREATE_EVENT_FAILED:
      return {
        ...state,
        spinner_create: false,
        data_create_event: {},
        error_create_event: {data:action.payload, error: true},
      }
    case PURGE_CREATE_EVENT:
      return {
        ...state,
        spinner_create: false,
        data_create_event: {},
        error_create_event: {},
      }
    case SHOW_UPDATE_EVENT_SPINNER:
      return {
        ...state,
        spinner_update: true,
        data_update_event: {},
        error_update_event: {},
      }
    case LOAD_UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        spinner_update: false,
        data_update_event: action.payload,
        error_update_event: {error: false},
      }
    case LOAD_UPDATE_EVENT_FAILED:
      return {
        ...state,
        spinner_update: false,
        data_update_event: {},
        error_update_event: {data:action.payload, error: true},
      }
    case PURGE_UPDATE_EVENT:
      return {
        ...state,
        spinner_update: false,
        data_update_event: {},
        error_update_event: {},
      }
    case SHOW_GET_EVENTS_SPINNER:
      return {
          ...state,
          show_spinner_get_events: true,
          error_get_events: {},
          events: [],
      }
    case LOAD_GET_EVENTS_SUCCESS:
      return {
        ...state,
        show_spinner_get_events: false,
        events: action.payload,
        error_get_events: {error: false},
      }
    case LOAD_GET_EVENTS_FAILED:
      return {
        ...state,
        show_spinner_get_events: false,
        events: [],
        error_get_events: {data:action.payload, error: true},
      }
    case PURGE_GET_EVENTS:
      return {
        ...state,
        show_spinner_get_events: false,
        events: [],
        error_get_events: {},
      }
    
    default:
      return state;
  }
};

export default EventReducer;
