import React, { useContext, Fragment, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../Context/contact/contactContext";
import ContactItem from "../Contacts/ContactItem";
import Spinner from '../Layout/Spinner'

const Contacts = () => {
  const contactContext = useContext(ContactContext); //because this line we have accecs to any state and actions in our context

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []); //[] for it to run at the begining without any depencdencies

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please Add a contact</h4>;
  }
  return (
    <Fragment>
      {/*       //if contacts are null and loading is true Spinner will be render
       */}
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}{" "}
    </Fragment>
  );
};

export default Contacts;
