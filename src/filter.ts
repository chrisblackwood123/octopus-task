import {getOutages, getSiteInfo} from "./client.js";
import {SITE_ID} from "./config.js";

export async function filterOutages(outageDate: string) {
    const outages = await getOutages();
    const displayNames = await getSiteInfo(SITE_ID)
    const deviceIds = new Set(displayNames.devices.map(d => d.id));
    return outages.filter(o =>
        new Date(o.begin) >= new Date(outageDate) &&
        deviceIds.has(o.id)
    );
}