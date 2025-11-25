import "dotenv/config";

export const API_KEY = process.env.API_KEY ?? "";
export const BASE_URL = process.env.BASE_URL ?? "";
export const SITE_ID = process.env.SITE_ID ?? "";

if (!API_KEY) throw new Error("API_KEY missing");
if (!BASE_URL) throw new Error("BASE_URL missing");
if (!SITE_ID) throw new Error("SITE_ID missing");