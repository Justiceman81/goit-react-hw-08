import { ErrorMessage, Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { apiAddNewContact } from "../../redux/contacts/operations";
import { nanoid } from "@reduxjs/toolkit";
import styles from "./ContactForm.module.css";
import * as Yup from "yup";

const phoneRegExp = /^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/;

const ContactForm = () => {
  const dispatch = useDispatch();
  const INITIAL_VALUES = {
    name: "",
    number: "",
  };
  const contactValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Must be at least 2 characters")
      .max(50, "Must be 50 characters or less")
      .required("Required"),
    number: Yup.string()
      .matches(
        phoneRegExp,
        "Phone number must be in the format 'xxx-xxx-xx-xx'"
      )
      .required("Required"),
  });
  const handleSubmit = (values, actions) => {
    const newContact = { ...values, id: nanoid() };
    dispatch(apiAddNewContact(newContact));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={contactValidationSchema}
    >
      <div className={styles.card}>
        <div className={styles.card2}>
          <Form className={styles.form}>
            <p className={styles.inputTitle}>Name</p>
            <Field className={styles.field} type="text" name="name" />
            <ErrorMessage
              className={styles.error}
              name="name"
              component="div"
            />
            <p className={styles.inputTitle}>Number</p>
            <Field className={styles.field} type="text" name="number" />
            <ErrorMessage
              className={styles.error}
              name="number"
              component="div"
            />
            <button className={styles.addBtn} type="submit">
              Add contact
            </button>
          </Form>
        </div>
      </div>
    </Formik>
  );
};

export default ContactForm;
