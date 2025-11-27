import axios, {type AxiosResponse} from "axios";
import type {Outage, SiteInfo} from "./models.js";
import { API_KEY, BASE_URL } from "./config.js";

async function retryRequest<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
    let lastError;

    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            return await fn();
        } catch (err: any) {
            const status = err?.response?.status;

            if (!status || (status >= 500 && status < 600)) {
                lastError = err;
                continue;
            }

            throw err;
        }
    }

    throw lastError ?? new Error("Request failed after retries");
}

export async function getOutages(): Promise<Outage[]> {
    return retryRequest(async () => {
        const res = await axios.get(`${BASE_URL}/outages`, {
            headers: { "x-api-key": API_KEY }
        });
        return res.data;
    });
}

export async function getSiteInfo(siteId: string): Promise<SiteInfo> {
    return retryRequest(async () => {
        const res = await axios.get(`${BASE_URL}/site-info/${siteId}`, {
            headers: { "x-api-key": API_KEY }
        });
        return res.data;
    });
}

export async function sendOutages(outages: Outage[], siteId: string) {
    return retryRequest(async () => {
        return await axios.post(
            `${BASE_URL}/site-outages/${siteId}`,
            outages,
            { headers: { "x-api-key": API_KEY } }
        );
    });
}
