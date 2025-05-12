"use server";

import { apiConfig } from "../config";
import { PATHS } from "../path";
import { Employee } from "./types";

const { baseUrl } = apiConfig;

export const getEmployees = async () => {
  const res = await fetch(`${baseUrl}/${PATHS.EMPLOYEES}`);
  const data: Employee[] = await res.json();
  return data;
};
