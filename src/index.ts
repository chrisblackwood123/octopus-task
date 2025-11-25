import {getOutages, getSiteInfo} from "./client.js";
import { SITE_ID } from "./config.js";
import 'dotenv/config'

async function main() {
    const siteInfo = await getSiteInfo(SITE_ID);
    console.log(siteInfo)
}

main();