import { type IDQuantityList, type OutterItem, type NewOrder} from '../types/api';
import { SITE_URL } from '../consts';
import type { OrderResponse } from 'types/orders';

export const sendOrder = async (order : NewOrder): Promise<OrderResponse> => {
    const { user, items: $ticketItems, outterItems:$outterItems, couppon, address } = order;
    const url = `${SITE_URL}/api/v1/orders/`;
    let ticket : IDQuantityList[]
        ticket = Object.values($ticketItems).map((ticketItem) => {
            const item: IDQuantityList = {
                id: ticketItem.id,
                quantity: ticketItem.quantity,
            };
            return item;
        });
        let outterItems : OutterItem[];
        outterItems = Object.values($outterItems).map((outterItem) => {
            const item: OutterItem = {
                name: outterItem.name,
                quantityDescription: outterItem.quantityDescription,
                description: outterItem.description,
            };
            return item;
        }
        );

        const data: NewOrder = {
            items: ticket,
            outterItems: outterItems,
            phone: user.phone,
            name: user.name,
            email: user.email,
            user: user,
            couppon: couppon,
            address: address,
        };
    
        
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            return {
                success: false,
                id: null,
                discount: null,
            }
        }

        const response = await res.json();
        const orderResponse: OrderResponse = {
            success: true,
            id: response.id,
            discount: response.discount,
        };
        return orderResponse;
        
    };