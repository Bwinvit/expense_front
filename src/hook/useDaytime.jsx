import { useEffect, useState } from "react";

const isDaytime = (timezone) => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", { timeZone: timezone });
  const hour = now.getUTCHours() + formatter.resolvedOptions().timeZone;

  const sunriseHour = 6;
  const sunsetHour = 18;

  return hour >= sunriseHour && hour < sunsetHour;
};

const useDaytimeStatus = () => {
  const [isDaytimeNow, setIsDaytimeNow] = useState(false);
  const [userTimezone, setUserTimezone] = useState(null);

  useEffect(() => {
    const fetchUserTimezone = async () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setUserTimezone(timezone);
      } catch (error) {
        console.error("Error fetching user timezone:", error);
      }
    };

    fetchUserTimezone();
  }, []);

  useEffect(() => {
    if (userTimezone) {
      setIsDaytimeNow(isDaytime(userTimezone));
    }
  }, [userTimezone]);

  return isDaytimeNow;
};

export default useDaytimeStatus;
