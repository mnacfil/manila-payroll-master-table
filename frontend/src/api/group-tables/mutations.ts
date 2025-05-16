"use server";

import { apiConfig } from "../config";
import { PATHS } from "../path";
import { CreateGroupPayload, CreateGroupRes, DeleteGroupRes } from "./types";

const { baseUrl } = apiConfig;

export const createGroup = async (payload: CreateGroupPayload) => {
  try {
    const response = await fetch(`${baseUrl}/${PATHS.GROUPS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => {});
      throw new Error(
        errorData.message ||
          `Server responded with status ${response.status}: ${response.statusText}`
      );
    }

    const data: CreateGroupRes = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting groups:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to get groups"
    );
  }
};

export const deleteGroup = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/${PATHS.GROUPS}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => {});
      throw new Error(
        errorData.message ||
          `Server responded with status ${response.status}: ${response.statusText}`
      );
    }
    const data: DeleteGroupRes = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting groups:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to get groups"
    );
  }
};
