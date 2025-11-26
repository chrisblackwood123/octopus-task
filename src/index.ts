import { OUTAGE_DATE, SITE_ID } from "./config.js";
import 'dotenv/config'
import {filterOutages} from "./filter.js";
import {getOutages, getSiteInfo, sendOutages} from "./client.js";
import * as console from "node:console";
import {processOutages} from "./service.js";

async function main() {
    const siteInfo = await getSiteInfo(SITE_ID);
    const outages = await getOutages();
    const filteredOutages = filterOutages(outages, OUTAGE_DATE, siteInfo);
    const processedOutages = processOutages(filteredOutages, siteInfo);
    const postResponse = await sendOutages(processedOutages, SITE_ID);

    console.log("Processed outages: ", processedOutages);

    if (postResponse.status === 200) {
        console.log("Successfully sent processed outages to the Kraken endpoint");
    } else {
        console.log("Error in sending processed outages to the Kraken endpoint");
    }
}

main();