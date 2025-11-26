import type {Outage, SiteInfo} from "./models.js";

export function processOutages(outages: Outage[], siteInfo: SiteInfo): Outage[] {
    const deviceMap = new Map(siteInfo.devices.map(device => [device.id, device.name]))
    return outages.map(outage => ({
        ...outage,
        name: deviceMap.get(outage.id) ?? "",
    }))
}