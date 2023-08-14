
import axios from 'axios';
import {
    SHOW_CREATE_EVENT_SPINNER,
    LOAD_CREATE_EVENT_SUCCESS,
    LOAD_CREATE_EVENT_FAILED,
    PURGE_CREATE_EVENT,
    SHOW_UPDATE_EVENT_SPINNER,
    LOAD_UPDATE_EVENT_SUCCESS,
    LOAD_UPDATE_EVENT_FAILED,
    PURGE_UPDATE_EVENT,
    SHOW_GET_EVENTS_SPINNER,
    LOAD_GET_EVENTS_SUCCESS,
    LOAD_GET_EVENTS_FAILED,
    PURGE_GET_EVENTS
   } from '../types';
   
   export const CreateEventAction = data => async dispatch => {
    if(data === 'PURGE'){
        dispatch({
            type: PURGE_CREATE_EVENT,
            payload: '',
          });
        return
    }
    try {
        dispatch({
            type: SHOW_CREATE_EVENT_SPINNER,
            payload: '',
          });
        const response = await axios.post('http://127.0.0.1:8000/event', data);
        console.log(response.status);
        if(response.status === 200){
            console.log(response.data);
            dispatch({
                type: LOAD_CREATE_EVENT_SUCCESS,
                payload: response.data,
              });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_CREATE_EVENT_FAILED,
            payload: error,
          });
    }
     };

    export const GetEventsAction = data => async dispatch => {
        if(data === 'PURGE'){
            dispatch({
                type: PURGE_GET_EVENTS,
                payload: '',
              });
            return
        }
        try {
            dispatch({
                type: SHOW_GET_EVENTS_SPINNER,
                payload: '',
            })
            const response = await axios.get('http://127.0.0.1:8000/event', {
                params: data
            });
            console.log(response.data);
            console.log(response.status);
            if(response.status === 200){
                dispatch({
                    type: LOAD_GET_EVENTS_SUCCESS,
                    payload: response.data,
                })
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: LOAD_GET_EVENTS_FAILED,
                payload: error
            })
        }
    }

    export const UpdateEventAction = data => async dispatch => {
        if(data === 'PURGE'){
            dispatch({
                type: PURGE_UPDATE_EVENT,
                payload: '',
            })
            return
        }
        try {
            dispatch({
                type: SHOW_UPDATE_EVENT_SPINNER,
                payload: '',
            })
            const response = await axios.put('http://127.0.0.1:8000/event', data);
            console.log(response.status);
            if(response.status === 200){
                dispatch({
                    type: LOAD_UPDATE_EVENT_SUCCESS,
                    payload: response.data,
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: LOAD_UPDATE_EVENT_FAILED,
                payload: error,
            })
        }
    }


   