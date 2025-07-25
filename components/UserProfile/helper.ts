export const formattedDate = (date: Date) => {
  return (
    date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }) +
    " " +
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  );
};
