import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { apiDeleteContact } from "../../redux/contacts/operations";
import styles from "./Contact.module.css";

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const onDelete = (id) => {
    dispatch(apiDeleteContact(id));
  };
  return (
    <div className={styles.containerMain}>
      <div className={styles.contactContainer}>
        <FaUser size="20" />
        <p className={styles.contactText}>{name}</p>
      </div>
      <div className={styles.contactContainer}>
        <FaPhoneAlt size="20" />
        <p className={styles.contactText}>{number}</p>
      </div>
      <button className={styles.contactBtn} onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
