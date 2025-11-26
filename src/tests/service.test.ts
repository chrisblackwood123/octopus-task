import { expect, test } from 'vitest';
import { expectedSiteInfo, expectedOutages, expectedProcessedOutages, expectedFilteredOutages } from "./test-utils.js";
import {processOutages} from "../service.js";
import type {Outage} from "../models.js";

test('should process outages according to task spec', () => {
    const processedOutages = processOutages(expectedFilteredOutages, expectedSiteInfo);
    expect(processedOutages).toEqual(expectedProcessedOutages);
})

test('should return empty array if date is empty string', () => {
    const outages: Outage[] = [];
    const processedOutages = processOutages(outages, expectedSiteInfo);
    expect(processedOutages).toEqual([]);
})

test('should return empty array if expectedSiteInfo.devices array is empty', () => {
    const siteInfo = { ...expectedSiteInfo, devices: [] };
    const filteredOutages = processOutages(expectedFilteredOutages, siteInfo);
    expect(filteredOutages).toEqual([]);
})