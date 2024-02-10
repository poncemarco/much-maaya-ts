import { type Order, type NewOrder } from '../types/api';
import { SITE_URL } from '../consts';

export const fetchOrder = async () => {
    const res = await fetch(`${SITE_URL}/api/v1/orders/19/`)
    const order = await res.json() as Order
    return order
}

export const sendOrder = async (data : NewOrder) => {
    const url = `${SITE_URL}/api/v1/orders/`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((res) => {
        if(!res.ok) {
            throw new Error('Network response was not ok');
        }
        return true;
    })
    .catch(error => {
        return false;
    });
    return res;
    
}