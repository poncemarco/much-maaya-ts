import { type Datum, type Items } from '../types/api';
import { SITE_URL } from 'consts';
import type { Categories } from '../types/categories'

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

export const fetchCategories = async () => {
    const res = await fetch(`${SITE_URL}/api/v1/categories/`)
    const categories = await (res.json()) as Categories[]
    return categories
}

