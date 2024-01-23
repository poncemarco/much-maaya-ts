import { type Order, type NewOrder } from '../types/api';
import { SITE_URL } from '../consts';

export const fetchOrder = async () => {
    const res = await fetch(`${SITE_URL}/api/v1/orders/19/`)
    const order = await res.json() as Order
    return order
}

export const sendOrder = async (data : NewOrder) => {
    const res = await fetch(`${SITE_URL}/api/v1/orders/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    
}