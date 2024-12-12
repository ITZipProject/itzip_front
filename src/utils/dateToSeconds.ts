export const dateToSeconds = (dateString: string) => {
  const date = new Date(dateString);
  const seconds = Math.floor(date.getTime() / 1000);

  return `${seconds}`;
};
