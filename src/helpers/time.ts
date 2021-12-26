import { DateTime } from "luxon";

export const getNextFortnight = (date: DateTime) =>
  DateTime.now().day > 15
    ? DateTime.now().endOf("month")
    : date.plus({ days: 15 - date.day });
