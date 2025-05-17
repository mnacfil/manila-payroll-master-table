"use server";

import { apiConfig } from "../config";
import { PATHS } from "../path";
import {
  CreateGroupOptionPayload,
  CreateGroupOptionRes,
  CreateGroupPayload,
  CreateGroupRes,
  DeleteGroupRes,
  DeleteOptionParams,
  UpdateGroupRes,
  UpdateOptionParams,
  UpdateOptionRes,
} from "./types";

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
    console.error("Error deleting getting group:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete group"
    );
  }
};

export const updateGroup = async (id: string, payload: CreateGroupPayload) => {
  try {
    const response = await fetch(`${baseUrl}/${PATHS.GROUPS}/${id}`, {
      method: "PUT",
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

    const data: UpdateGroupRes = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating group:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update group"
    );
  }
};

export const createGroupOption = async (
  groupId: string,
  payload: CreateGroupOptionPayload
) => {
  try {
    const response = await fetch(
      `${baseUrl}/${PATHS.GROUPS}/${groupId}/${PATHS.OPTIONS}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => {});
      throw new Error(
        errorData.message ||
          `Server responded with status ${response.status}: ${response.statusText}`
      );
    }

    const data: CreateGroupOptionRes = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating group option:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to create group option"
    );
  }
};

export const updateGroupOption = async ({
  optionId,
  groupId,
  payload,
}: UpdateOptionParams) => {
  try {
    const response = await fetch(
      `${baseUrl}/${PATHS.GROUPS}/${groupId}/${PATHS.OPTIONS}/${optionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => {});
      throw new Error(
        errorData.message ||
          `Server responded with status ${response.status}: ${response.statusText}`
      );
    }

    const data: UpdateOptionRes = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating group option:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to create group option"
    );
  }
};

export const deleteGroupOption = async ({
  optionId,
  groupId,
}: DeleteOptionParams) => {
  try {
    const response = await fetch(
      `${baseUrl}/${PATHS.GROUPS}/${groupId}/${PATHS.OPTIONS}/${optionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => {});
      throw new Error(
        errorData.message ||
          `Server responded with status ${response.status}: ${response.statusText}`
      );
    }

    const data: { success: boolean } = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting group option:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to deleting group option"
    );
  }
};
