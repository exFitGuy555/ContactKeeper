import React, {useContext,Fragment} from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import ContactContext from '../../Context/contact/contactContext'
import ContactItem from '../Contacts/ContactItem'

 const Contacts = () => {
     const contactContext = useContext(ContactContext) //because this line we have accecs to any state and actions in our context

     const {contacts,filtered} = contactContext;

     if(contacts.length === 0){
         return <h4>Please Add a contact</h4>
     }
    return (
        <Fragment>
            <TransitionGroup>
            {filtered !== null ? filtered.map(contact => (
            <CSSTransition  key={contact.id} timeout={500} classNames="item">
            <ContactItem  contact={contact} /> 
            </CSSTransition>
            )) 
            : contacts.map(contact => (
            <CSSTransition  key={contact.id} timeout={500} classNames="item">
            <ContactItem contact={contact} />
            </CSSTransition>
            ))}
            </TransitionGroup>
        </Fragment>
    )
}


export default Contacts