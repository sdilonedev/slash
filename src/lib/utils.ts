import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date) => {
  return format(date, "dd MMMM, yyyy");
};


export const parseUserAgent = (userAgent: string) => {
  const osMatch = userAgent.match(/\(([^)]+)\)/);
  const browserMatch = userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera)[\/\s](\d+\.\d+)/);
  const engineMatch = userAgent.match(/(AppleWebKit|Gecko|Blink)[\/\s](\d+\.\d+)/);

  return {
    os: osMatch ? osMatch[1] : "Unkown",
    browser: browserMatch ? `${browserMatch[1]} ${browserMatch[2]}` : "Unkown browser",
    engine: engineMatch ? `${engineMatch[1]} ${engineMatch[2]}` : "Unkown engine",
  }
}