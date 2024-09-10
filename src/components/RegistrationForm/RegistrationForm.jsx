import { useState } from "react";
import { useDispatch } from "react-redux";
import { apiRegister } from "../../redux/auth/operations";
import styles from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(apiRegister({ name, email, password }));
  };

  return (
    <div className={styles.card}>
      <div className={styles.card2}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <p className={styles.title}>Registration</p>
          <div className={styles.field}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.field}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
              autocomplete="off"
              placeholder="Email"
              required
            />
          </div>

          <div className={styles.field}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className={styles.submit}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
