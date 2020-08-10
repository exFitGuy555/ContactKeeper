import React, {useReducer} from 'react'
import { v4 as uuid } from "uuid"; 
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import {
ADD_CONTACT ,
DELETE_CONTACT,
SET_CURRENT ,
CLEAR_CURRENT ,
UPDATE_CONTACT,
FILTER_CONTACTS,
CLEAR_FILTER ,
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [
            {
            id: 1,
            name: 'Guy',
            email : 'guy@gmail.com',
            phone: '1111-111-111',
            type: 'personal'
           },
            {
            id: 2,
            name: 'yosi',
            email : 'yosi@gmail.com',
            phone: '1111-111-111',
            type: 'personal'
           },
            {
            id: 3,
            name: 'Moto',
            email: 'Moto@gmail.com',
            phone: '1111-111-111',
            type: 'professional'
           }],
           current: null,
           filtered: null,
    }
    
    //state allows us to access everything to in our state
    //dispatch allows us to dispatch objects to the reducer
    const [state, dispatch] = useReducer(ContactReducer, initialState)


    //From here we will have all our actions
    

    //Add Contact
    const addContact = contact => {
        contact.id = uuid();
        dispatch({type: ADD_CONTACT, 
        payload: contact
        })
    }

    //Delete Contact
 const deleteContact = id => {
     dispatch({
         type: DELETE_CONTACT,
         payload: id
     })
 }
    //set Current Contact
     const setCurrent = contact => {
         dispatch({
             type: SET_CURRENT,
             payload: contact
         })
     }

    //Clear current Contact
   const clearCurrent = () => {
       dispatch({
           type: CLEAR_CURRENT,
       })
   }
    //Update Contact
       const updateContact = contact => {
         dispatch({
             type: UPDATE_CONTACT,
             payload: contact
         })
     }

    //Filter contacts
      const filterContacts = text => {
          dispatch({
              type: FILTER_CONTACTS,
              payload: text
          })
      }

    //clear Filter
    const clearFilter = () => {
        dispatch({
           type: CLEAR_FILTER
    })
}
    return (
    <ContactContext.Provider
    /* value means anything we want to be able to  acceses from other componenets including State and actions*/
    value= {{
     contacts: state.contacts,
     current:  state.current,
     filtered: state.filtered,
     setCurrent,
     clearCurrent,
     addContact,
     updateContact,
     deleteContact,
     filterContacts,
     clearFilter
    
    }} >
        {props.children}
    </ContactContext.Provider> )
}   

export default ContactState;
