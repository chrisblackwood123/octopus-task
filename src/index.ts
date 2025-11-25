import {getOutages} from "./client.js";
import 'dotenv/config'

async function main() {
    const outages = await getOutages();
    console.log(outages)
}

main();