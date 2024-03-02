import { type IDQuantityList, type OutterItem, type NewOrder} from '../types/api';
import { SITE_URL } from '../consts';

export const sendOrder = async (order : NewOrder): Promise<boolean> => {
    const { user, items: $ticketItems, outterItems:$outterItems, couppon } = order;
    const url = 'http://localhost:8000/api/v1/orders/';
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
        };
    
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
    
            return true; // Si la solicitud se completa correctamente
        } catch (error) {
            return false; // Si ocurre algún error
        }
    };