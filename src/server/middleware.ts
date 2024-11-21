"use server";

import db from "@/server/db";
import { headers } from "next/headers";

interface urlFromServerResult {
  error: boolean;
  message: string;
  redirect404?: boolean;
  url?: string;
}

export const urlFromServer = async (
  shortCode: string,
): Promise<urlFromServerResult> => {
  try {
    const getLinkFromServer = await db.links.findUnique({
      where: {
        shortCode: shortCode,
      },
    });

    if (!getLinkFromServer) {
      return {
        error: false,
        message: "Slug not found or invalid.",
        redirect404: true,
      };
    }

    // Obtener información del usuario
    const headerInfo = headers();
    const ipAddress = (await headerInfo).get("x-forwarded-for") || "0.0.0.0"; // IP del usuario
    const userAgent = (await headerInfo).get("user-agent") || "Unknown User-Agent"; // User-Agent del navegador
    const referrer = (await headerInfo).get("referer") || null; // Referente (si existe)

    // Registrar clic en la tabla UrlClicks
    await db.urlClicks.create({
      data: {
        urlId: getLinkFromServer.id,
        ipAddress,
        userAgent,
        referrer,
      },
    });

    // Incrementar contador de clics
    await db.links.update({
      where: {
        id: getLinkFromServer.id,
      },
      data: {
        clickCount: {
          increment: 1,
        },
        lastClicked: new Date(),
      },
    });

    return {
      error: false,
      message: "Success",
      url: getLinkFromServer.originalUrl,
    };
  } catch (error) {
    console.error("Error (urlFromServer): ", error);
    return {
      error: true,
      message: "Something went wrong.",
    };
  }
};
