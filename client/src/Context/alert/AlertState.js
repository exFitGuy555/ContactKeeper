import React, {
    useReducer
} from 'react'

import AlertContext from './alertContext'
import alertReducer from './alertReducer'
import {v4 as uuid} from 'uuid'

import {
 SET_ALERT,
 REMOVE_ALERT
} from '../types'

const AlertState = props => {
        const initialState = [];

        //state allows us to access everything to in our state
        //dispatch allows us to dispatch objects to the reducer
        const [state, dispatch] = useReducer(alertReducer, initialState)


        //From here we will have all our actions

         //Set Alert
        const setAlert = (msg, type, timeout=5000) => {
         const id = uuid();
         dispatch({ 
             type: SET_ALERT,
             payload: {msg, type, id}

         });

         setTimeout(() => dispatch({
             type: REMOVE_ALERT,
             payload: id
         }), timeout)
        }

        return ( <AlertContext.Provider
            /* value means anything we want to be able to  acceses from other componenets including State and actions*/
            value = {
                {   
                   alerts: state,
                   setAlert
                }
            } > {
                props.children
            } </AlertContext.Provider> )
        }

        export default AlertState;
