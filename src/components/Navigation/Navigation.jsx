import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

const Navigation = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  return (
    <div className={styles.wrapper}>
      <nav>
        <ul className={styles.nav}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              Home
            </NavLink>
          </li>

          {isLoggedIn && (
            <li>
              <NavLink
                to="/contacts"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.link
                }
              >
                Contacts
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
