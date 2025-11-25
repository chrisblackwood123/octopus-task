import {getOutages, getSiteInfo} from "./client.js";
import 'dotenv/config'

async function main() {
    const siteInfo = await getSiteInfo();
    console.log(siteInfo)
}

main();