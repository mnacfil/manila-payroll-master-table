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

export const ONE_MINUTE = 60 * 1000;
export const DEFAULT_GROUPS = ["department", "position"];
export const DEPARTMENT_GRP_ID = "97692a4a-3167-11f0-ac50-d345de8915cd";
export const POSITION_GRP_ID = "830f7482-5499-499f-a8ec-cd04bcb26371";

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
  position: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  department: {
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
  "position",
  "department",
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
