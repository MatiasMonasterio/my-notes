import dayjs from "dayjs";

export const date = (datetime: Date): string => {
  return dayjs(datetime).format("MMM DD, YYYY");
};
