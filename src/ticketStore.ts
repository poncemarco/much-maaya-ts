import { map } from 'nanostores';

export type TicketItem = {
    id: string,
    name: string,
    price: number,
    quantity: number
}

export type TicketItemdisplayInfo = Pick<TicketItem, 'id' | 'name' | 'price' | 'quantity' >;

export const ticketItems = map<Record<string, TicketItem>>({});

export function addTicketItem({ id, name, quantity, price }: TicketItem) {
    const existingEntry = ticketItems.get()[id];
    if (existingEntry) {
        ticketItems.setKey(id, {
            ...existingEntry,
            quantity: existingEntry.quantity + quantity
        });
    } else {
        ticketItems.setKey(id, {
            id, 
            name,
            price,
            quantity
        });
    }
}