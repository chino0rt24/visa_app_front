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
    SHOW_GET_AVAILABILITY_SPINNER,
    LOAD_GET_AVAILABILITY_SUCCESS,
    LOAD_GET_AVAILABILITY_FAILED,
    PURGE_GET_AVAILABILITY
} from '../types';
import axios from 'axios';
export const ConfigurateWeeklyAction = data => async dispatch => {
    if(data === 'PURGE'){
        dispatch({
            type: PURGE_CONFIGURATE_WEEKLY,
            payload: '',
        })
        return
    }
    try {
        dispatch({
            type: SHOW_CONFIGURATE_WEEKLY_SPINNER,
            payload: '',
        });
        const response = await axios.post('http://127.0.0.1:8000/schedule', data);
        console.log(response.status);
        if (response.status === 200) {
            dispatch({
                type: LOAD_CONFIGURATE_WEEKLY_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_CONFIGURATE_WEEKLY_FAILED,
            payload: error,
        });
    }
}

export const UpdateWeeklyAction = data => async dispatch => {
    try {
        dispatch({
            type: SHOW_UPDATE_WEEKLY_SPINNER,
            payload: '',
        });
        const response = await axios.put('http://127.0.0.1:8000/schedule', data);
        console.log(response.status);
        if (response.status === 200) {
            dispatch({
                type: LOAD_UPDATE_WEEKLY_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_UPDATE_WEEKLY_FAILED,
            payload: error,
        });
    }
}

export const GetWeeklyHoursAction = data => async dispatch => {
    try {
        dispatch({
            type: SHOW_GET_WEEKLY_HOURS_SPINNER,
            payload: '',
        });
        const response = await axios.get('http://127.0.0.1:8000/schedule', {
            params: data
        });
        console.log(response.data);
        console.log(response.status);
        if (response.status === 200) {
            dispatch({
                type: LOAD_GET_WEEKLY_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_GET_WEEKLY_FAILED})
    }
}

export const GetAvailabilityAction = data => async dispatch => {
    if(data === 'PURGE'){
        dispatch({
            type: PURGE_GET_AVAILABILITY,
            payload: '',
        })
        return;
    }
    try {
        dispatch({
            type: SHOW_GET_AVAILABILITY_SPINNER,
            payload: '',
        });
        const response = await axios.get('http://127.0.0.1:8000/availability', {
            params: data
        });
        console.log(response.data);
        console.log(response.status);
        if (response.status === 200) {
            dispatch({
                type: LOAD_GET_AVAILABILITY_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_GET_AVAILABILITY_FAILED})
    }
}

