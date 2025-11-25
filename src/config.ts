import "dotenv/config";

export const API_KEY = process.env.API_KEY ?? "";
export const BASE_URL = process.env.BASE_URL ?? "";

if (!API_KEY) throw new Error("API_KEY missing");