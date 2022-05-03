import PropTypes from "prop-types";
import styles from "./WeatherImg.module.scss";

const WeatherImg = (props) => {
  return (
    <div className={styles.main}>
      <img src={props.imgSprite} style={props.isNight ? { filter: "invert(1)" } : { filter: "invert(0)" }} alt=""></img>
    </div>
  );
};

WeatherImg.propTypes = {
  imgSprite: PropTypes.string,
};

WeatherImg.defaultProps = {
  imgSprite: "",
};

export default WeatherImg;
