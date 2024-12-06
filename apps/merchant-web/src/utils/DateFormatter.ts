export const FormatDateLiterary = (isoDate) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);
}
