import type { Location } from '../types/locations.ts';
import { SITE_URL } from 'consts';

export const fetchLocation = async (postalCode: string) => {
    const url = `http://localhost:8000/api/v1/locations/get-postal-address/?postal_code=${postalCode}` 
    const res = await fetch(url)
    const location = await (res.json()) as Location
    console.log(location)
    return location
}