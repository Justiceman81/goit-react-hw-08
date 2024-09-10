import { useDispatch, useSelector } from "react-redux";
import {
  selectUserContactsError,
  selectUserContactsIsLoading,
} from "../../redux/contacts/selectors";
import { useEffect } from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import { apiGetContacts } from "../../redux/contacts/operations";
import Loader from "../../components/Loader/Loader";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectUserContactsIsLoading);
  const error = useSelector(selectUserContactsError);

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  return (
    <div className="containerContacts">
      <h1>Contacts</h1>
      <ContactForm />
      {loading && <Loader />}
      {error && <p>{error}</p>}
      <SearchBox />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
