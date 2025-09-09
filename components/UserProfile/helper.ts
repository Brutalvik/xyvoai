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

/**
 * Remove dashes from a UUID-like string.
 * Example: "68e9f4d6-0c26-4410-a87f-7063f2390058"
 * → "68e9f4d60c264410a87f7063f2390058"
 */
export function removeDashes(uuid: string): string {
  return uuid.replace(/-/g, "");
}

