import { useSelector, useDispatch } from "react-redux";
import { selectVisibleContacts } from "../../redux/contacts/slice";
import { useEffect } from "react";
import {
  apiGetContacts,
  apiDeleteContact,
} from "../../redux/contacts/operations";
import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  return (
    <ul className={styles.list}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading &&
        !error &&
        contacts.map((contact) => (
          <Contact
            key={contact.id}
            id={contact.id}
            name={contact.name}
            number={contact.number}
            onDelete={() => dispatch(apiDeleteContact(contact.id))}
          />
        ))}
    </ul>
  );
};

export default ContactList;
