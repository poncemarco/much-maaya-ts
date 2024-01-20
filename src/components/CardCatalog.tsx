import type { TicketItemdisplayInfo } from '../ticketStore';
import { useState } from 'react';
import { addTicketItem } from '../ticketStore';

type Props = {
    name: string;
    price: number;
    image: string | undefined;
    id: string;
    unit: string;
    category: string;
}
type Props2 = {
    item: TicketItemdisplayInfo;
};



export default function CardCatalog({ name,  price, image, id, unit, category }: Props) {

    const [quantity, setQuantity] = useState(0);

    const item: TicketItemdisplayInfo = {
        id: id,
        name: name,
        price: price,
        quantity: quantity,
    };


    const handleAdd = () => {
        console.log(item);
        setQuantity(quantity + 1);
    };

    const handleSubtract = () => {
        setQuantity(quantity - 1);
    };

    const saveItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setQuantity(0);
        addTicketItem(item);
    }



    return (
        <div className='bg-white dark:bg-gray-800 rounded-lg border shadow-md border-gray-700
        hover:scale-105 hover:bg-gray-100 hover:border-gray-100 transition flex 
        flex-col max-h-full'>
            <picture className="flex justify-center p-4">
                <img src={image} alt={name} className='mb-2 rounded-lg' />
            </picture>
            <header className='p-4 flex-grow dark:text-white'>
                <span className='text-gray-900 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:text-white'>
                    {price.toFixed(2)}
                </span>
                <span className='text-gray-900 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:text-white'>
                    {unit}
                </span>
                <h2 className="text-gray-900 my-2 text-2xl font-bold tracking-tight dark:text-white">
                    {name}
                </h2>
                <button className="text-gray-900 border px-4 py-2 text-xl dark:text-white" onClick={handleSubtract}>-</button>
                <span>{quantity}</span>
                <button className="text-gray-900 border px-4 py-2 text-xl dark:text-white" onClick={handleAdd}>+</button>
                    <button type='submit' onClick={saveItem} className='text-gray-900 border px-4 py-2 text-xl dark:text-white'>Agregar a ticket</button>
                <a href={`/catalogo/${id}/`} className="text-gray-900 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    Ver detalles
                </a>
            </header>
        </div>
    );
};