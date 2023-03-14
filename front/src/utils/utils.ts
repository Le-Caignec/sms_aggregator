
export function timestampToDateString(timestamp: number) {
  // Create a new Date object from the timestamp in milliseconds
  const dateObj = new Date(timestamp);

  // Get the day, month, and year values from the Date object
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1; // Add 1 to adjust for zero-based month indexing
  const year = dateObj.getFullYear();

  // Format the day, month, and year values as a string in dd/mm/yyyy format
  const formatted_date = `${day}/${month}/${year}`;
  return formatted_date
}