"use server";

import { apiConfig } from "../config";
import { PATHS } from "../path";
import {
  CreateEmployeePayload,
  CreateEmployeeRes,
  UpdateEmployeeParams,
} from "./types";

const { baseUrl } = apiConfig;

export const deleteEmployee = async (id: string) => {
  const response = await fetch(`${baseUrl}/${PATHS.EMPLOYEES}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong while deleting employee.");
  }
  const data = await response.json();
  return data;
};

export const createEmployee = async (payload: CreateEmployeePayload) => {
  const body = {
    ...payload,
    active: 1,
    date_hired: new Date(payload.date_hired).toISOString().split("T")[0],
  };
  try {
    const response = await fetch(`${baseUrl}/${PATHS.EMPLOYEES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => {});
      throw new Error(
        errorData.message ||
          `Server responded with status ${response.status}: ${response.statusText}`
      );
    }

    const data: CreateEmployeeRes = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to create employee"
    );
  }
};

export const updateEmployee = async ({ id, payload }: UpdateEmployeeParams) => {
  try {
    const body = {
      ...payload,
      ...(payload.date_hired && {
        date_hired: new Date(payload.date_hired).toISOString().split("T")[0],
      }),
    };

    const response = await fetch(`${baseUrl}/${PATHS.EMPLOYEES}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => {});
      throw new Error(
        errorData?.message ||
          `Server responded with status ${response.status}: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update employee"
    );
  }
};
