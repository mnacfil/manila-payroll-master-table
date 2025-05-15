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

export const getEmployee = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/${PATHS.EMPLOYEES}/${id}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => {});
      throw new Error(
        errorData.message ||
          `Server responded with status ${response.status}: ${response.statusText}`
      );
    }
    const data: Employee = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting employee:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to get employee"
    );
  }
};
