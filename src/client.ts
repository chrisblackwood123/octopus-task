import axios from "axios";
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
        console.error(status);
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
        console.error(status);
        throw err;
    }
}