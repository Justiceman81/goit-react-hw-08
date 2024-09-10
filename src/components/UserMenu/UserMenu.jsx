import { useDispatch, useSelector } from "react-redux";
import { apiLogout } from "../../redux/auth/operations";
import styles from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogOut = async () => {
    try {
      await dispatch(apiLogout()).unwrap();
      dispatch(apiLogout());
    } catch (error) {
      console.error("Failed to log out:", error.message);
    }
  };

  return (
    <div className={styles.userMenu}>
      <span className={styles.userName}>Hello, {user.name}</span>
      <button onClick={handleLogOut} className={styles.logoutButton}>
        Log Out
      </button>
    </div>
  );
};

export default UserMenu;
