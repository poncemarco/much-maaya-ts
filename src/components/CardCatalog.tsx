import type { TicketItemdisplayInfo } from '../ticketStore';
import { useState } from 'react';
import { addTicketItem } from '../ticketStore';
import Toast from './Toast.tsx';
import IntCounter from './IntCounter.tsx';
import FloatCounter from './FloatCounter.tsx';

type Props = {
    name: string;
    price: number;
    image: string | any;
    id: string;
    unit: string;
    category: string;
};

export default function CardCatalog({ name,  price, image, id, unit, category }: Props) {

    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [lastQuantity, setLastQuantity] = useState(0);
    
    const item: TicketItemdisplayInfo = {
        id: id,
        name: name,
        price: price,
        quantity: quantity,
        imageUrl: image,
        unit: unit,
        thumbnail: image.image_path.thumbnail
    };

    const handleAdd = () => {
        setQuantity(quantity + 1);
    };
    const { image_path } = image;
    const { primary } = image_path;
    
    const handleSubtract = () => {
        if (quantity === 1) return;
        setQuantity(quantity - 1);
    };

    const saveItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (quantity === 0) {
          setQuantity(quantity + 1);
        }
        setShowToast(true);
        addTicketItem(item);
        setLastQuantity(quantity);
        setQuantity(1);
      };



      return (
        <div className="relative item-center w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img className="p-8 rounded-t-lg" src={ primary  } alt="product image" />
          {item.unit === 'KG' && quantity > 0 ? (
            <span className="absolute top-3 right-3 bg-blue-700 text-white px-2 py-2 rounded-full">
              {quantity} KGS
            </span>
          ) :  quantity > 1 && (
            <span className="absolute top-3 right-3 bg-blue-700 text-white px-2 py-2 rounded-full">
              {quantity} 
            </span>
          
          )}
          <div className="px-5 pb-5">
            <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h2>
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <p className='text-gray-900 dark:text-white'>{category}</p>
              </div>
              <span className="text-gray-900 bg-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{unit}</span>
            </div>
            {
                item.unit === 'KG' ? (
                    <FloatCounter
                        item={item}
                        setQuantity={setQuantity}
                        saveItem={saveItem}
                        price={price}
                    />
                ) : (
                    <IntCounter 
                        handleSubtract={handleSubtract}
                        handleAdd={handleAdd}
                        saveItem={saveItem}
                        price={price}
                    />
                )
            }
            
          </div>
          {showToast && (
            <Toast name={name} quantity={lastQuantity} itsKg={unit === "KG"}/>
          )}
        </div>
      );
    };