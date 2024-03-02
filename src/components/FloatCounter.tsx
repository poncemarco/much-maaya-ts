import React from 'react';
import type { TicketItemdisplayInfo } from '../ticketStore';

type Props = {
    setQuantity: (quantity: number) => void;
    saveItem: (e: React.MouseEvent<HTMLButtonElement>) => void;
    price: number;
    item: TicketItemdisplayInfo;
    };

const Counter = ({ setQuantity, saveItem, item } : Props) => {
     
    return (
        <div className='grid grid-cols-2'>
            <div className='flex items-center justify-center'>
                <span className="text-3xl font-bold text-gray-900 mr-1 dark:text-white">${item.price.toFixed(2)}</span>
                <span className="text-xl font-bold text-gray-900 mr-1 dark:text-white">/Kg</span>
            </div>
            <div className='grid grid-rows-2'>
                <div className='flex items-center justify-center'>
                    <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        id="Line1Qty"
                        onChange={(e) => setQuantity(parseFloat(e.target.value))}
                        className="h-8 w-8 rounded border-gray-200 bg-gray-50 p-0 mr-2 text-center text-xl text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <span className="text-xl my-2 font-bold text-gray-900 mr-1 dark:text-white">Kgs</span>
                </div>
                <div>
                    
                    <button onClick={saveItem} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Agregar a ticket
                    </button>
                </div>
            </div>    
        </div>
    );
};

export default Counter;