import React from "react";
import PropTypes from "prop-types";
import styles from "./WeatherCard.module.scss";
import WeatherImg from "../../components/WeatherImg/WeatherImg.js";
import windImgs from "../../assets/windImages.js";
import weatherImgs from "../../assets/weatherImages.js";

const WeatherCard = (props) => {
  const weatherImg = getWeatherImg(props.cloudCover, props.precipitation);
  const windImg = getWindImg(props.windDirection, props.windSpeed);
  return (
    <div className={styles.card} style={props.isNight ? { backgroundColor: "black" } : { backgroundColor: "white" }}>
      <div className={styles.temperaturecontainer}>
        <p style={props.isNight ? { color: "white" } : { color: "black" }}>{props.temperature}°C</p>
      </div>
      <WeatherImg imgSprite={weatherImg} isNight={props.isNight} />
      <WeatherImg imgSprite={windImg} isNight={props.isNight} />
    </div>
  );
};

function getWeatherImg(cloudCover, precipitation) {
  if (precipitation > 0) {
    if (precipitation < 2.5) {
      return weatherImgs[1][0];
    } else if (precipitation < 7.6) {
      return weatherImgs[1][1];
    } else {
      return weatherImgs[1][1];
    }
  } else {
    return weatherImgs[0][Math.round((3 / 8) * cloudCover)];
  }
}

function getWindImg(windDir, windSpeed) {
  let adjustedWindDir = (windDir += 22);
  if (adjustedWindDir > 359) {
    adjustedWindDir -= 359;
  }
  const dirIndex = Math.floor(adjustedWindDir / 45);
  let speedIndex = 0;
  if (windSpeed > 4 && windSpeed < 10) {
    speedIndex = 1;
  } else if (windSpeed >= 10) {
    speedIndex = 2;
  }
  return windImgs[dirIndex][speedIndex];
}

WeatherCard.propTypes = {
  temperature: PropTypes.number,
  windDirection: PropTypes.number,
  windSpeed: PropTypes.number,
  cloudCover: PropTypes.number,
  precipitation: PropTypes.number,
};

WeatherCard.defaultProps = {
  temperature: -999,
  windDirection: -1,
  windSpeed: -1,
  cloudCover: 0,
  precipitation: 0,
};

export default WeatherCard;
