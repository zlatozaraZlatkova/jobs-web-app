export function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  if (year < 1950 || year > 2050) {
    return "";
  }

  return `${month} ${year}`;
}
