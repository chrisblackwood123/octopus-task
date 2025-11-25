import axios from "axios";

export async function getOutages() {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/outages`, {
            headers: { "x-api-key": process.env.API_KEY}
        });
        return response.data;
    } catch (err: any) {
        const status = err?.response?.status;
        console.error(status);
        throw err;
    }
}

export async function getSiteInfo() {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/site-info/norwich-pear-tree`, {
            headers: { "x-api-key": process.env.API_KEY}
        });
        return response.data;
    } catch (err: any) {
        const status = err?.response?.status;
        console.error(status);
        throw err;
    }
}