import { map } from 'nanostores';

export type TicketItem = {
    id: string,
    name: string,
    price: number,
    quantity: number,
    slug: string,
}

export type TicketItemdisplayInfo = Pick<TicketItem, 'id' | 'name' | 'price' | 'quantity' | 'slug'>;

export const ticketItems = map<Record<string, TicketItem | any>>({});

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

export function removeTicketItem(id: string) {
    ticketItems.setKey(id, undefined);
}