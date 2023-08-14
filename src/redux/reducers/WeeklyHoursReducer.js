import {
    SHOW_CONFIGURATE_WEEKLY_SPINNER,
    LOAD_CONFIGURATE_WEEKLY_SUCCESS,
    LOAD_CONFIGURATE_WEEKLY_FAILED,
    PURGE_CONFIGURATE_WEEKLY,
    SHOW_UPDATE_WEEKLY_SPINNER,
    LOAD_UPDATE_WEEKLY_SUCCESS,
    LOAD_UPDATE_WEEKLY_FAILED,
    PURGE_UPDATE_WEEKLY,
    SHOW_GET_WEEKLY_HOURS_SPINNER,
    LOAD_GET_WEEKLY_SUCCESS,
    LOAD_GET_WEEKLY_FAILED,
    PURGE_GET_WEEKLY,
    SHOW_GET_EVENTS_SPINNER,
    LOAD_GET_EVENTS_SUCCESS,
    LOAD_GET_EVENTS_FAILED,
    PURGE_GET_EVENTS,
    SHOW_GET_AVAILABILITY_SPINNER,
    LOAD_GET_AVAILABILITY_SUCCESS,
    LOAD_GET_AVAILABILITY_FAILED,
    PURGE_GET_AVAILABILITY
} from '../types';

const stateWeekly = {
    spinner_configurate_weekly: false,
    data_configurate_weekly: {},
    error_configurate_weekly: {},
    spinner_update_weekly: false,
    data_update_weekly: {},
    error_update_weekly: {},
    spinner_get_weekly_hours: false,
    error_get_weekly_hours: {},
    weekly_hours_current: [],
    spinner_get_availability: false,
    error_get_availability: {},
    availability: {},
} 

const WeekyHoursReducer = function(state = stateWeekly, action) {
    switch (action.type) {
        case SHOW_CONFIGURATE_WEEKLY_SPINNER:
            return {
                ...state,
                spinner_configurate_weekly: true,
                data_configurate_weekly: {},
                error_configurate_weekly: {},
            };
        case LOAD_CONFIGURATE_WEEKLY_SUCCESS:
            return {
                ...state,
                spinner_configurate_weekly: false,
                data_configurate_weekly: action.payload,
                error_configurate_weekly: {error: false},
            };
        case LOAD_CONFIGURATE_WEEKLY_FAILED:
            return {
                ...state,
                spinner_configurate_weekly: false,
                data_configurate_weekly: {},
                error_configurate_weekly: {data:action.payload, error: true},
            }
        case PURGE_CONFIGURATE_WEEKLY:
            return {
                ...state,
                spinner_configurate_weekly: false,
                data_configurate_weekly: {},
                error_configurate_weekly: {},
            }
        case SHOW_UPDATE_WEEKLY_SPINNER:
            return {
                ...state,
                spinner_update_weekly: true,
                data_update_weekly: {},
                error_update_weekly: {},
            }
        case LOAD_UPDATE_WEEKLY_SUCCESS:
            return {
                ...state,
                spinner_update_weekly: false,
                data_update_weekly: action.payload,
                error_update_weekly: {error: false},
            }
        case LOAD_UPDATE_WEEKLY_FAILED:
            return {
                ...state,
                spinner_update_weekly: false,
                data_update_weekly: {},
                error_update_weekly: {data:action.payload, error: true},
            }
        case PURGE_UPDATE_WEEKLY:
            return {
                ...state,
                spinner_update_weekly: false,
                data_update_weekly: {},
                error_update_weekly: {},
            }
        case SHOW_GET_WEEKLY_HOURS_SPINNER:
            return {
                ...state,
                spinner_get_weekly_hours: true,
                error_get_weekly_hours: {},
                weekly_hours_current: [],
            }
        case LOAD_GET_WEEKLY_SUCCESS:
            return {
                ...state,
                spinner_get_weekly_hours: false,
                weekly_hours_current: action.payload,
                error_get_weekly_hours: {error: false},
            }
        case LOAD_GET_WEEKLY_FAILED:
            return {
                ...state,
                spinner_get_weekly_hours: false,
                weekly_hours_current: [],
                error_get_weekly_hours: {data:action.payload, error: true},
            }
        case PURGE_GET_WEEKLY:
            return {
                ...state,
                spinner_get_weekly_hours: false,
                weekly_hours_current: [],
                error_get_weekly_hours: {},
            }
        case SHOW_GET_AVAILABILITY_SPINNER:
            return {
                ...state,
                spinner_get_availability: true,
                error_get_availability: {},
                availability: {},
            }
        case LOAD_GET_AVAILABILITY_SUCCESS:
            return {
                ...state,
                spinner_get_availability: false,
                availability: action.payload.availability,
                error_get_availability: {error: false},
            }
        case LOAD_GET_AVAILABILITY_FAILED:
            return {
                ...state,
                spinner_get_availability: false,
                availability: {},
                error_get_availability: {data:action.payload, error: true},
            }
        case PURGE_GET_EVENTS:
            return {
                ...state,
                spinner_get_availability: false,
                availability: {},
                error_get_availability: {},
            }
        default:
            return state;
    }
}
export default WeekyHoursReducer;
