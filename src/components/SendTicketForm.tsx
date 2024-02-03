import { useStore } from '@nanostores/react';
import { ticketItems, OutterItems } from '../ticketStore';
import { useState } from 'react';
import { sendOrder } from '../services/order';
import { type NewOrder, type IDQuantityList, type OutterItem } from '../types/api';

export default function SendTicketButton() {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [ orderSent, setOrderSent ] = useState(false);

    const $ticketItems = useStore(ticketItems);
    const $outterItems = useStore(OutterItems);

    const total = Object.values($ticketItems).reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    const sendTicket = async () => {
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
        
        const data : NewOrder = {
            items: ticket,
            outterItems: outterItems,
            phone: phone,
            name: name,
        };
        console.log(data);

        try {
            const response = await fetch('http://localhost:8000/api/v1/orders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                    return false;
                }
                console.log(res);
                return true;
            }).catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
                return false;
            }
            );
            
            setOrderSent(response);
        } catch (error) {
           console.log(error);
        }

    }

    return (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <div className="max-w-sm mx-auto">
                <div className="mb-5">
                <label htmlFor="tel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu Whatsapp</label>
                <input 
                    type="tel" 
                    id="tel" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="55 4647 6943" 
                    name="tel" 
                    onChange={(e) => setPhone(e.target.value)}
                    required/>
                </div>
                <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu nombre / Empresa</label>
                <input 
                type="text" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                name="name" 
                onChange={(e) => setName(e.target.value)}
                required/>
                </div>
                <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                    <input 
                    id="remember" 
                    type="checkbox" 
                    value={name} 
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    onChange={(e) => setName(e.target.value)}
                    required/>
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Recordarme</label>
                </div>
                <button 
                    onClick={sendTicket}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Enviar pedido
                </button>
            </div>
        </div>
    );
};