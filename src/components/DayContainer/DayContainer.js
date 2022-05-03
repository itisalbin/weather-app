import React from "react";
import PropTypes from "prop-types";
import styles from "./DayContainer.module.scss";
import WeatherCard from "../../components/WeatherCard/WeatherCard.js";

const DayContainer = ({ timeSeriesSingleDay, sunData }) => {
  const days = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];

  const containerDay = timeSeriesSingleDay[0].validTime;
  const dateMilli = Date.parse(containerDay);
  const dateContainer = new Date(dateMilli);

  let sunriseHour = 5;
  let sunsetHour = 21;
  if (sunData) {
    sunriseHour = new Date(Date.parse(sunData.results.sunrise)).getHours();
    sunsetHour = new Date(Date.parse(sunData.results.sunset)).getHours();
  }

  return (
    <div className={styles.dayContainer}>
      <h2>{days[dateContainer.getDay()] + " " + dateContainer.getDate()}</h2>
      <div className={styles.scrollcontainer}>
        {timeSeriesSingleDay &&
          timeSeriesSingleDay.map((timeSerie, i) => {
            const dateMilli = Date.parse(timeSerie.validTime);
            const date = new Date(dateMilli);

            const temperature = timeSerie.parameters.find((parameter) => parameter.name === "t");

            const windDirection = timeSerie.parameters.find((parameter) => parameter.name === "wd");

            const windSpeed = timeSerie.parameters.find((parameter) => parameter.name === "gust");

            const cloudCover = timeSerie.parameters.find((parameter) => parameter.name === "tcc_mean");

            const precipitation = timeSerie.parameters.find((parameter) => parameter.name === "pmean");

            return (
              <div key={i + "a"} className={styles.timecontainer}>
                <p>Kl. {date.toTimeString().substring(2, 0)}</p>
                <WeatherCard
                  temperature={temperature.values[0]}
                  windDirection={windDirection.values[0]}
                  windSpeed={windSpeed.values[0]}
                  cloudCover={cloudCover.values[0]}
                  precipitation={precipitation.values[0]}
                  isNight={checkIfNight(timeSerie, sunriseHour, sunsetHour)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

function checkIfNight(timeSerie, sunriseHour, sunsetHour) {
  const cardHour = new Date(Date.parse(timeSerie.validTime)).getHours();
  if (cardHour > sunriseHour && cardHour < sunsetHour) {
    return false;
  }
  return true;
}

export default DayContainer;
