import { expect, test } from 'vitest';
import { expectedSiteInfo, expectedOutages, expectedProcessedOutages, expectedFilteredOutages } from "./test-utils.js";
import {filterOutages} from "../filter.js";
import type { Outage } from "../models.js";

const OUTAGE_DATE = "2022-01-01T00:00:00.000Z";

test('should filter outages according to task spec', () => {
    const filteredOutages = filterOutages(expectedOutages, OUTAGE_DATE, expectedSiteInfo);
    expect(filteredOutages).toEqual(expectedFilteredOutages);
})

test('should return empty array if outages array is empty', () => {
    const outages: Outage[] = [];
    const filteredOutages = filterOutages(outages, OUTAGE_DATE, expectedSiteInfo);
    expect(filteredOutages).toEqual([]);
})

test('should return empty array if date is empty string', () => {
    const filteredOutages = filterOutages(expectedOutages, "", expectedSiteInfo);
    expect(filteredOutages).toEqual([]);
})

test('should return empty array if expectedSiteInfo.devices array is empty', () => {
    const siteInfo = { ...expectedSiteInfo, devices: [] };
    const filteredOutages = filterOutages(expectedOutages, OUTAGE_DATE, siteInfo);
    expect(filteredOutages).toEqual([]);
})