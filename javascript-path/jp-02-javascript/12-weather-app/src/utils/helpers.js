export function getUVColor(uvIndex) {
  if (uvIndex <= 2) return "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)";
  if (uvIndex <= 7) return "linear-gradient(90deg, #f6d365 0%, #fda085 100%)";
  return "linear-gradient(90deg, #ff0844 0%, #ffb199 100%)";
}

export function getCurrentTime(timeZone) {
  const currentTime = new Date()
    .toLocaleTimeString("es-AR", {
      timeZone: timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .split("")
    .splice(0, 5)
    .join("");

  return currentTime;
}

export function getCurrentTimeFormatted(currentTime) {
  const formattedCurrentTime =
    typeof currentTime === "number"
      ? currentTime
      : Number(currentTime.split("").splice(0, 2).join(""));

  return formattedCurrentTime;
}

export function getWeekDaysFormatted(timeZone, daysArray) {
  const weekDaysArrFormatted = [];
  for (let i = 0; i < 7; i++) {
    const epoch = daysArray[i].datetimeEpoch * 1000;

    const day = new Date(epoch).toLocaleDateString("en-US", {
      timeZone: timeZone,
      weekday: "long",
    });

    weekDaysArrFormatted.push(day);
  }

  return weekDaysArrFormatted;
}

export function getCurrentDateFormatted(timeZone) {
  const date = new Date().toLocaleDateString("en-US", {
    timeZone: timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return date;
}

export function getHourlyForecastFormatted(data, targetDay, day) {
  const arrayCleaned = data.map((ele, index) => {
    return {
      hour:
        (index === 0 && targetDay === 0) || (index === 0 && day === undefined)
          ? "Now"
          : ele.datetime.split("").splice(0, 5).join(""),
      icon: ele.icon,
      temp: ele.temperature,
    };
  });
  return arrayCleaned;
}
