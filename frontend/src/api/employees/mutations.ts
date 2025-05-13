"use server";

import { apiConfig } from "../config";
import { PATHS } from "../path";

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
