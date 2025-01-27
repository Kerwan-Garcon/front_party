import { DateTime } from "luxon";

export const extractDateInformations = (date: Date) => {
  const dt = DateTime.fromISO(date.toString()).setLocale("fr");

  const formattedDay = dt.day;
  const formattedMonthYear = dt.monthLong;
  const formattedYear = dt.year;

  const formattedFullDate = dt.toLocaleString(DateTime.DATE_FULL);

  const formattedHours = dt.hour;

  return {
    formattedDay,
    formattedMonthYear,
    formattedYear,
    formattedFullDate,
    formattedHours,
  };
};
