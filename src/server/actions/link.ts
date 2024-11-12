"use server";

import type { z } from "zod";
import type { CreateLinkSchema, EditLinkSchema } from "@/server/validation";
import { auth } from "@/auth";
import db from "@/server/db";
import { revalidatePath } from "next/cache";

/** Helper function to verify user authentication */
const getAuthenticatedUser = async () => {
  const user = await auth();
  if (!user) {
    console.error("User is not authenticated.");
    throw new Error("Authentication required. Please log in.");
  }
  return user;
};

/**
 * Retrieve a single link by its ID.
 * @param linkId - The ID of the link
 * @returns The link object or null if not found
 */
export const getLinkById = async (linkId: string) => {
  try {
    await getAuthenticatedUser();
    return await db.links.findUnique({ where: { id: linkId } });
  } catch (error) {
    console.error("Failed to fetch the link:", error);
    return null;
  }
};


export const getLinksByUser = async () => {
  try {
    const user = await auth();
    if (!user) {
      console.error("User is not authenticated.");
      throw new Error("Authentication required. Please log in.");
    }

    const linkData = await db.links.findMany({ where: { userId: user.user.id } });

    return {
      limit: user.user?.limitLinks,
      links: linkData
    };
  } catch (error) {
    console.error("Failed to fetch the links from this user:", error);
    return null;
  }
}

/**
 * Check if a shortcode (slug) is already in use.
 * @param shortCode - The shortcode of the link
 * @returns Boolean indicating if the shortcode exists
 */
export const isShortCodeAvailable = async (shortCode: string): Promise<boolean> => {
  const existingLink = await db.links.findUnique({ where: { shortCode: shortCode } });
  if (existingLink) {
    return true;
  }

  return false;
};


interface createLinkResult {
  limit?: boolean;
  error?: string;
  linkId?: string;
}

export const createShortLink = async (
  values: z.infer<typeof CreateLinkSchema>,
): Promise<createLinkResult> => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return { error: "Not authenticated. Please login again." };
  }

  // Get number of links created by the user:
  const count = await db.links.count({
    where: {
      userId: currentUser.user?.id,
    },
  });

  // Check if the user has reached the limit:
  const limit = currentUser.user?.limitLinks;
  if (count >= limit) {
    return {
      limit: true,
      error: `You have reached the limit of ${limit} links.`,
    };
  }

  // Create new link:
  const result = await db.links.create({
    data: {
      ...values,
      userId: currentUser.user?.id,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard");

  return { limit: false, linkId: result.id };
};

/**
 * Update the existing link details.
 * @param formData - The updated data from the form
 * @returns void
 */
export const updateShortLink = async (formData: z.infer<typeof EditLinkSchema>) => {
  try {
    const currentUser = await getAuthenticatedUser();
    const { id: userId } = currentUser.user;

    await db.links.update({
      where: { id: formData.id },
      data: { ...formData, userId: userId },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Failed to update the link:", error);
  }
};

/**
 * Delete a link by its ID.
 * @param linkId - The ID of the link to be deleted
 * @returns The deleted link object or null if an error occurs
 */
export const deleteShortLink = async (linkId: string) => {
  try {
    const currentUser = await getAuthenticatedUser();
    const { id: userId } = currentUser.user;

    const deletedLink = await db.links.delete({
      where: { id: linkId, userId: userId },
    });

    revalidatePath("/dashboard");
    return deletedLink;
  } catch (error) {
    console.error("Error deleting the link:", error);
    return null;
  }
};

/**
 * Export all user-created links as a JSON array.
 * @returns Array of user links or null if an error occurs
 */
export const exportUserLinks = async () => {
  try {
    const currentUser = await getAuthenticatedUser();
    const { id: userId } = currentUser.user;

    const userLinks = await db.links.findMany({
      where: { userId: userId },
      select: { shortCode: true, originalUrl: true, createdAt: true },
    });

    return userLinks;
  } catch (error) {
    console.error("Error fetching user links:", error);
    return null;
  }
};
