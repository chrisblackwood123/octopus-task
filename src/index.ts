import { OUTAGE_DATE, SITE_ID } from "./config.js";
import 'dotenv/config'
import {filterOutages} from "./filter.js";
import {getOutages, getSiteInfo} from "./client.js";
import * as console from "node:console";
import {processOutages} from "./service.js";

async function main() {
    const siteInfo = await getSiteInfo(SITE_ID);
    const outages = await getOutages();
    const filteredOutages = filterOutages(outages, OUTAGE_DATE, siteInfo);
}

main();