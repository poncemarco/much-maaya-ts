import { type Order } from '../types/api';

export const fetchOrder = async () => {
    const res = await fetch('http://localhost:8000/api/v1/orders/19/')
    const order = await res.json() as Order
    console.log(order)
    return order
}