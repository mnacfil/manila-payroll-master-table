export const formatDate = (date: string | null) => {
  if (!date) return "-";
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
};

export const formatSalary = (salary: number) => {
  const formattedSalary = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(salary);

  return formattedSalary;
};

export const formatDateHired = (dateHired: string) => {
  return new Date(dateHired).toISOString().split("T")[0];
};
