"use server";

import { apiConfig } from "../config";
import { PATHS } from "../path";
import { GetGroupOptionsRes, GroupsRes, UpdateGroupRes } from "./types";
const { baseUrl } = apiConfig;

export const getGroups = async () => {
  try {
    const response = await fetch(`${baseUrl}/${PATHS.GROUPS}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => {});
      throw new Error(
        errorData.message ||
          `Server responded with status ${response.status}: ${response.statusText}`
      );
    }
    const data: GroupsRes = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting groups:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to get groups"
    );
  }
};

export const getFirstGroup = async () => {
  try {
    const response = await fetch(`${baseUrl}/${PATHS.FIRST_GROUP}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => {});
      throw new Error(
        errorData.message ||
          `Server responded with status ${response.status}: ${response.statusText}`
      );
    }
    const data: UpdateGroupRes = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting first groups", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to get first group"
    );
  }
};

export const getGroupOptions = async (id: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/${PATHS.GROUPS}/${id}/${PATHS.OPTIONS}`
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => {});
      throw new Error(
        errorData.message ||
          `Server responded with status ${response.status}: ${response.statusText}`
      );
    }
    const data: GetGroupOptionsRes = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting group options:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to get group options"
    );
  }
};
