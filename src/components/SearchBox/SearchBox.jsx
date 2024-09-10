import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleFilter = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={styles.searchBox}>
      <p className={styles.searchBoxLabel}>Find contacts by name</p>
      <div className={styles.field}>
        <input
          className={styles.searchBoxInput}
          type="text"
          value={filter}
          onChange={handleFilter}
        />
      </div>
    </div>
  );
};

export default SearchBox;
