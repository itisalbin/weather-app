import React from "react";
import { useState, useEffect } from "react";
import styles from "./home.module.scss";
import DayContainer from "../../components/DayContainer/DayContainer.js";

function Home() {
  const [result, setResult] = useState();
  const [timeSeries, setTimeSeries] = useState();
  const [sunData, setSunData] = useState();
  const timeSeriesDays = [];
  let lastDayDate = 0;
  let arrayHasBeenSet = false;
  const lat = "57.706039";
  const long = "11.936433";

  useEffect(() => {
    lastDayDate = 0;
    const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${long}/lat/${lat}/data.json`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        if (arrayHasBeenSet) return;

        setResult(data);

        data.timeSeries.map((timeSerie, i) => {
          const dateMilli = Date.parse(timeSerie.validTime);
          const date = new Date(dateMilli);
          const currentDay = date.getDate();
          if (lastDayDate !== currentDay) {
            lastDayDate = currentDay;
            timeSeriesDays.push([]);
          }
          timeSeriesDays[timeSeriesDays.length - 1].push(timeSerie);

          return;
        });
        setTimeSeries(timeSeriesDays);
        arrayHasBeenSet = true;
      });
    const urlSun = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&formatted=0`;

    fetch(urlSun)
      .then((res) => {
        res.json();
      })
      .then((data) => {
        setSunData(data);
      })
      .catch();
  }, [sunData]);

  return (
    <div className={styles.home}>
      <h1>Yrgoväder!</h1>
      {result &&
        timeSeries.map((timeSeries, i) => {
          return <DayContainer key={i} timeSeriesSingleDay={timeSeries} sunData={sunData} />;
        })}
    </div>
  );
}

export default Home;
