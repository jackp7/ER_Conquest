import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

const CountdownTimer = () => {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate time left until next midnight PST or until August 7th, 2023
  function getTimeLeft() {
    const now = moment().tz("America/Los_Angeles");
    const targetDate = moment
      .tz("2023-08-06", "America/Los_Angeles")
      .endOf("day");
    let midnight;

    // Check if the current date is before August 7th, 2023
    if (now.isBefore(targetDate)) {
      midnight = targetDate;
    } else {
      midnight = now.clone().endOf("day");
    }

    const diff = moment.duration(midnight.diff(now));

    return `${Math.floor(
      diff.asHours()
    )}:${diff.minutes()}:${diff.seconds()}`.padStart(8, "0");
  }

  return <h1>{time}</h1>;
};
export default CountdownTimer;
