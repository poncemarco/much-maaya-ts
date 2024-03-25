import React from 'react';
type Props = {
    handleSubtract: () => void;
    handleAdd: () => void;
    saveItem: (e: React.MouseEvent<HTMLButtonElement>) => void;
    quantity: number;
    price: number;
    unit: string;
    };


const IntCounter = ({ handleSubtract, handleAdd, saveItem, price, quantity, unit }: Props) => {

  return (
    <div className="flex items-center justify-between">
      <span className="text-3xl font-bold text-gray-900 mr-1 dark:text-white">${price.toFixed(2)}</span>
      <button 
        className='text-white border px-3 py-2 text-xl bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg hover:bg-blue-800 dark:text-white'
        onClick={handleSubtract}
      >
        -
      </button>
      <button onClick={saveItem} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center sm:text-large dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {(quantity && quantity > 1) ? `Agregar ${quantity} ${unit == "Caja" ? unit + "s" : unit + "es"}` : 'Agregar a carrito' }
      </button>
      <button 
        className='text-white border px-3 quantity py-2 text-xl bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg hover:bg-blue-800'
        onClick={handleAdd}
      >
        +
      </button>
    </div>
  );
};

export default IntCounter;