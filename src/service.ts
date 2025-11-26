import type {Outage, OutageWithDeviceName, SiteInfo} from "./models.js";

export function processOutages(outages: Outage[], siteInfo: SiteInfo): OutageWithDeviceName[] {
    if (!outages || outages.length === 0) return [];
    if (!siteInfo || !siteInfo.devices || siteInfo.devices.length === 0) return [];

    const deviceMap = new Map(siteInfo.devices.map(device => [device.id, device.name]))
    return outages.map(outage => ({
        ...outage,
        name: deviceMap.get(outage.id) ?? "",
    }))
}