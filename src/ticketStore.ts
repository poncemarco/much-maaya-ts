import { map } from 'nanostores';

export type TicketItem = {
    id: string,
    name: string,
    price: number,
    quantity: number,
    slug: string,
}

export type OutterItem = {
    name: string,
    description: string,
    quantityDescription: string
}

export type TicketItemdisplayInfo = Pick<TicketItem, 'id' | 'name' | 'price' | 'quantity' | 'slug'>;

export type OutterItemDisplayInfo = Pick<OutterItem, 'name' | 'description' | 'quantityDescription'>;


export const ticketItems = map<Record<string, TicketItem | any>>({});

export const OutterItems = map<Record<string, OutterItem | any>>({});

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

export function addOutterItem({ name, description, quantityDescription }: OutterItem) {
    const existingEntry = OutterItems.get()[name];
    if (existingEntry) {
        OutterItems.setKey(name, {
            ...existingEntry,
            quantityDescription: existingEntry.quantityDescription + quantityDescription
        });
    } else {
        OutterItems.setKey(name, {
            name,
            description,
            quantityDescription
        });
    }
}

export function removeTicketItem(id: string) {
    ticketItems.setKey(id, undefined);
}

export function removeOutterItem(name: string) {
    OutterItems.setKey(name, undefined);
}