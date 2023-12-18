import { type Datum, type Items } from '../types/api';

export const fetchItems = async () => {
    const res = await fetch('http://localhost:8000/api/v1/items/') 
    const { data: items } = await res.json() as Items
    return items
}

export const fetchItem = async ({ id }: { id:string}) => {
    const res = await fetch(`http://localhost:8000/api/v1/items/${id}/`)
    
    const item  = await (res.json()) as Datum
    console.log(item)
    return item
}