import axios from "axios"

const env = 'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft'

export const fetchDetails = async () => {
    try {
        const response = await axios.get(env);
        return response.data;
    } catch (error) {
        console.error('Fetch failed:', error);
        throw error;
    }
}