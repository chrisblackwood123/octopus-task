import type {Outage, SiteInfo} from "./models.js";

export function filterOutages(outages: Outage[], outageDate: string, siteInfo: SiteInfo): Outage[] {
    const deviceIds = new Set(siteInfo.devices.map(d => d.id));
    return outages.filter(o =>
        new Date(o.begin) >= new Date(outageDate) &&
        deviceIds.has(o.id)
    );
}

