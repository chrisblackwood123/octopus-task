import axios, {type AxiosResponse} from "axios";
import type {Outage, SiteInfo} from "./models.js";
import { API_KEY, BASE_URL } from "./config.js";

export async function getOutages(): Promise<Outage[]> {
    try {
        const response = await axios.get(`${BASE_URL}/outages`, {
            headers: { "x-api-key": API_KEY}
        });
        return response.data;
    } catch (err: any) {
        const status = err?.response?.status;
        console.error("Failed to get outages:", status);
        throw err;
    }
}

export async function getSiteInfo(siteId: string): Promise<SiteInfo> {
    try {
        const response = await axios.get(`${BASE_URL}/site-info/${siteId}`, {
            headers: { "x-api-key": API_KEY}
        });
        return response.data;
    } catch (err: any) {
        const status = err?.response?.status;
        console.error("Failed to get site info: ", status);
        throw err;
    }
}

export async function sendOutages(outages: Outage[], siteId: string): Promise<AxiosResponse<any>> {
    try {
        return await axios.post(
            `${BASE_URL}/site-outages/${siteId}`,
            outages,
            {
                headers: { "x-api-key": API_KEY }
            }
        );
    } catch (err: any) {
        const status = err?.response?.status;
        console.error("Failed to send outages", status);
        throw err;
    }
}