export const formatDate = (date: Date) => {
  const today = new Date(date);
  const yyyy = today.getFullYear();
  let mm: string | number = today.getMonth() + 1; // Months start at 0!
  let dd: string | number = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  return formattedToday;
};
