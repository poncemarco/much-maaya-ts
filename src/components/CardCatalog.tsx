import type { TicketItemdisplayInfo } from '../ticketStore';
import { useState } from 'react';
import { addTicketItem } from '../ticketStore';
import { SITE_URL } from '../consts';
import Toast from './Toast.tsx';

type Props = {
    name: string;
    price: number;
    image: string | any;
    id: string;
    unit: string;
    category: string;
};

export default function CardCatalog({ name,  price, image, id, unit, category }: Props) {

    const [quantity, setQuantity] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [lastQuantity, setLastQuantity] = useState(0);
    const item: TicketItemdisplayInfo = {
        id: id,
        name: name,
        price: price,
        quantity: quantity,
        imageUrl: image,
        unit: unit,
    };

    const handleAdd = () => {
        setQuantity(quantity + 1);
    };

    const handleSubtract = () => {
        if (quantity === 0) return;
        setQuantity(quantity - 1);
    };

    const saveItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowToast(true);
        addTicketItem(item);
        setLastQuantity(quantity);
        setQuantity(0);
    }



    return (
        <div className="relative item-center w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="p-8 rounded-t-lg" src={ image } alt="product image" />
            {quantity > 0 && (
                <span className="absolute top-3 right-3 bg-blue-700 text-white px-2 py-2 rounded-full">
                    {quantity}
                </span>
            )}
            <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <p className='text-gray-900 dark:text-white'>{category}</p>
                    </div>
                    <span className="text-gray-900 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{unit}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 mr-1 dark:text-white">${price.toFixed(2)}</span>
                    <button 
                    className='text-white border px-3 py-2 text-xl bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg hover:bg-blue-800 dark:text-white'
                    onClick={handleSubtract}
                    >
                        -
                    </button>
                    <button onClick={saveItem} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Agregar a ticket
                    </button>
                    <button 
                    className='text-white border px-3 py-2 text-xl bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg hover:bg-blue-800'
                    onClick={handleAdd}
                    >
                        +
                    </button>
                </div>
            </div>
            {showToast && (
                <Toast name={name} quantity={lastQuantity} />
            )}
        </div>
        );
    };