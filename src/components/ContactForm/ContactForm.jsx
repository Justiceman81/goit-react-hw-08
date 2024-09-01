import { ErrorMessage, Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import { nanoid } from "@reduxjs/toolkit";
import css from "./ContactForm.module.css";
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
    dispatch(addContact(newContact));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={contactValidationSchema}
    >
      <Form className={css.form}>
        <p className={css.inputTitle}>Name</p>
        <Field className={css.field} type="text" name="name" />
        <ErrorMessage className={css.error} name="name" component="div" />
        <p className={css.inputTitle}>Number</p>
        <Field className={css.field} type="text" name="number" />
        <ErrorMessage className={css.error} name="number" component="div" />
        <button className={css.addBtn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
