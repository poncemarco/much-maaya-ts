import { type Datum, type Items } from '../types/api';

export const fetchItems = async () => {
    const res = await fetch('http://localhost:8000/api/v1/items/?page_size=100') 
    const { data} = await res.json() as Items
    return data 
}

export const fetchItem = async ({ id }: { id:string}) => {
    const res = await fetch(`http://localhost:8000/api/v1/items/${id}/`)
    const item  = await (res.json()) as Datum
    return item
}