import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner.jsx";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
function CityList({ cities, isLoading }) {
  CityList.proptypes = {
    cities: PropTypes.array,
    isLoading: PropTypes.bool,
  };

  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.cityList}>
      {/* eslint-disable-next-line react/prop-types */}
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
