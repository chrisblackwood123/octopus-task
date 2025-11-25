import { OUTAGE_DATE } from "./config.js";
import 'dotenv/config'
import {filterOutages} from "./filter.js";

async function main() {
    const filteredOutages = await filterOutages(OUTAGE_DATE);
    for (const outage of filteredOutages) {
        console.log(outage);
    }
}

main();