export const formatDate = (date: string | Date): string => {
  const d = new Date(date);

  // options for month name
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return d.toLocaleDateString("en-US", options); // Example: "05 Feb 2026"
};
