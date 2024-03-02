import { type Datum, type Items } from '../types/api';
import { SITE_URL } from 'consts';

export const fetchItems = async () => {
    const res = await fetch(`${SITE_URL}/api/v1/items/?page_size=500`) 
    const { results: data } = await res.json() as Items
    return data 
}

export const fetchItem = async ({ id }: { id:string}) => {
    const res = await fetch(`${SITE_URL}/api/v1/items/${id}/`)
    const item  = await (res.json()) as Datum
    return item
}