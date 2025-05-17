import { FilterMatchMode, FilterOperator } from "primereact/api";

export const DashboardLinks = [
  {
    title: "Master Table",
    items: [
      {
        label: "Employees",
        href: "/employees",
        icon: "user",
      },
      {
        label: "Group Tables",
        href: "/group-tables",
        icon: "table",
      },
      {
        label: "Loan Account",
        href: "/loan-account",
        icon: "wallet",
      },
      {
        label: "Government Rates",
        href: "/government-rates",
        icon: "percentage",
      },
    ],
  },
];

export const DEFAULT_GROUP_ICON = "table";

export const icons = [
  {
    name: "Building",
    code: "building",
  },
  {
    name: "Table",
    code: "table",
  },
  {
    name: "Calendar",
    code: "calendar-minus",
  },
  {
    name: "Briefcase",
    code: "briefcase",
  },
  {
    name: "Book",
    code: "book",
  },
  {
    name: "Card",
    code: "credit-card",
  },
  {
    name: "Expand",
    code: "expand",
  },
  {
    name: "Folder",
    code: "folder",
  },
];

export const employeeInitFilters = {
  global: { value: "", matchMode: FilterMatchMode.CONTAINS },
  first_name: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  last_name: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  email: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  salary: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.STARTS_WITH }],
  },
  date_hired: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.STARTS_WITH }],
  },
};

export const employeeGlobalFilterFields = [
  "first_name",
  "last_name",
  "email",
  "salary",
  "date_hired",
];

export const groupInitFilters = {
  global: { value: "", matchMode: FilterMatchMode.CONTAINS },
  code_id: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  name: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  description: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
};

export const groupGlobalFilterFields = ["code_id", "name", "description"];
