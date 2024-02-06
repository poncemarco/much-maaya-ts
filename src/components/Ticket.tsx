import { useStore } from '@nanostores/react';
import { ticketItems,  OutterItems } from '../ticketStore';
import OutterItemForm from './OutterItemForm';
import { useState, useEffect } from 'react';

export default function Ticket() {
    const $ticketAmountFreeShipment = 900;
    const $ticketItems = useStore(ticketItems);
    const $outterItems = useStore(OutterItems);
    const [ shipment, setShipment ] = useState(90);
    const [ progress, setProgress ] = useState(0);
    const [ remaining, setRemaining ] = useState($ticketAmountFreeShipment);


    useEffect(() => {
        const percent = (total / 900) * 100;
        if (percent >= 100) {
            setProgress(100);
            setShipment(0);
            setRemaining(0);
            return;
        }
        else {
            setProgress(percent);
            setShipment(90);
            setRemaining(900 - total);
        }
    }, [$ticketItems]);

    

    const total = Object.values($ticketItems).reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    const addItemToTicket = ( id : string) => {
        const existingEntry = ticketItems.get()[id];
        ticketItems.setKey(id, {
            ...existingEntry,
            quantity: existingEntry.quantity + 1
        });

    };

    const removeItemFromTicket = (id: string) => {
        if (ticketItems.get()[id].quantity === 1) {
            ticketItems.setKey(id, undefined);
            return;
        }
        const existingEntry = ticketItems.get()[id];
        ticketItems.setKey(id, {
            ...existingEntry,
            quantity: existingEntry.quantity - 1
        });
    };


    return (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
           <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <div className="mt-8">
                        <ul className="space-y-4">
                            {Object.values($ticketItems).map((item) => (
                                <li className="flex items-center gap-4" key={item.name}>
                                <img
                                    src={item.imageUrl}
                                    alt=""
                                    className="h-16 w-16 rounded object-cover"
                                />
                    
                                <div>
                                    <h3 className="text-sm text-gray-900 dark:text-white">{item.name}</h3>
                                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600 dark:text-gray-100">
                                    <div>
                                        <dt className="inline">Unidad:</dt>
                                        <dd className="inline">{item.unit}</dd>
                                    </div>
                                    </dl>
                                </div>
                    
                                <div className="flex flex-1 items-center justify-end gap-2 dark:text-white">
                                    <div>
                                    <label htmlFor="Line1Qty" className="sr-only"> Quantity </label>
                                    <button 
                                        type="button" 
                                        onClick={() => removeItemFromTicket(item.id)}
                                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        id="Line1Qty"
                                        className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => addItemToTicket(item.id)}
                                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        >
                                        +
                                    </button>
                                    </div>
                    
                                    <button className="text-gray-600 transition hover:text-red-600">
                                    <span className="sr-only">Remove item</span>
                    
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="h-4 w-4 text-gray-900 dark:text-white"
                                    >
                                        <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                    </svg>
                                    </button>
                                </div>
                                </li>
                            ))
                                }
                        
                        </ul>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                            <div>
                                <h6 className='text-gray-800 dark:text-white'>
                                    {remaining > 0 ? "$" + remaining.toFixed(2) + " para envío gratis" : null }
                                </h6>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                            <div className="w-screen max-w-lg space-y-4">
                                <dl className="space-y-0.5 text-sm text-gray-700">
                                    <div className="flex justify-between text-gray-800 dark:text-white">
                                    <dt>
                                        Envío:
                                    </dt>
                                    <dd>
                                        {shipment.toFixed(2)}
                                    </dd>
                                    </div>
                                    <div className="flex justify-between !text-base font-medium text-gray-800 dark:text-white">
                                    <dt>Total</dt>
                                    <dd>${(total + shipment).toFixed(2)}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            { Object.values($outterItems).length ? (
                <div key={2}>
                    <h1 className='text-gray-900 dark:text-white'>Productos fuera de catálogo</h1>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Producto
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Cantidad
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Descipción
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                    {Object.values($outterItems).map((outterItem) => (
                        
                                <tr key={outterItem.name} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className='px-6 py-4 font-medium text-gray-900 dark:text-white'>
                                        {outterItem.name}
                                    </td>
                                    <td className='px-6 py-4'>
                                        {outterItem.quantityDescription}
                                    </td>
                                    <td className='px-6 py-4'>
                                        {outterItem.description}
                                    </td>
                                </tr>
                    ))
                    }
                        </tbody>
                    </table>
                </div>
                ): null}
            <div className='py-4 bottom-0 w-full'>
                <OutterItemForm />
            </div>
            <div className="flex justify-center">
                <a
                href="/contact"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                Ir a envío de ticket
                </a>
            </div>
        </div>
    )
}