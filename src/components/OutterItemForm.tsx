import { useState } from 'react';
import { addOutterItem } from '../ticketStore';


export default function OutterItemForm() {
    const [showForm, setShowForm] = useState(false);
    const [outterItem, setoutterItem] = useState({
        name: '',
        description: '',
        quantityDescription: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setoutterItem({
            ...outterItem,
            [e.target.name]: e.target.value
        });
    };

    const saveItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(outterItem);
        addOutterItem(outterItem);
        setShowForm(false);
    };

    return (
        <>
            <div>
                <button onClick={() => setShowForm(!showForm)} className='bg-gray-200 dark:bg-gray-700 rounded-lg border shadow-md border-gray-700'>
                    Agregar Producto Fuera del Catálogo
                </button>
            </div>
            { showForm ? (
                
            <div className="max-w-sm mx-auto">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Nombre del producto
                    </label>
                    <input 
                    type="text" 
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name='name'
                    placeholder='Ej. Chocolate Abuelita en Caja de 10 piezas'
                    onChange={handleInputChange}
                    required/>
                </div>
                <div>
                <label 
                    htmlFor="base-input" 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                Cantidad 
                </label>
                <input 
                    type="text"
                    name="quantityDescription"
                    id="quantityDescription"
                    onChange={handleInputChange}
                    placeholder='Ej. 5 cajas de 10 piezas'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                </div>
                <div>
                <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Descripción
                </label>
                <input 
                type="text" 
                id="large-input"
                name='description'
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleInputChange}
                />
                </div>
                <div>
                    <button onClick={saveItem} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"'>
                        Agregar a ticket
                    </button>
                </div>
            </div>

            ) : null}
        </>
    );

};

