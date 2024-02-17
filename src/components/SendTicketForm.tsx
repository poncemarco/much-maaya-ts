import { useState, useEffect, type SyntheticEvent, type SetStateAction } from 'react';
import { useStore } from '@nanostores/react';
import { ticketItems, OutterItems } from '../ticketStore';
import { sendOrder } from '../services/order';
import { removeOutterItem } from '../ticketStore';
import { type NewOrder, type IDQuantityList, type OutterItem, type User} from '../types/api';

export default function SendTicketForm() {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [couppon, setCouppon] = useState('');
    const [orderSent, setOrderSent] = useState(false);
    const [sendingOrder, setSendingOrder] = useState(false);
    const [ readyToSend, setReadyToSend] = useState(false); 
    const [error, setError] = useState({
        phone: "",
        name: "",
        email: "",
    });

    const $ticketItems = useStore(ticketItems);
    const $outterItems = useStore(OutterItems);

    const total = Object.values($ticketItems).reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    const sendTicket = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (!readyToSend) {
            // Validar campos y establecer errores individualmente
            let newErrors: { [key: string]: string }  = {};
    
            if (name.length < 3) {
                newErrors = { ...newErrors, name: "El nombre debe tener al menos 3 caracteres" };
            }
            if (phone.length < 10) {
                newErrors = { ...newErrors, phone: "El número de teléfono debe tener al menos 10 caracteres" };
            }
            if (email.length < 5) {
                newErrors = { ...newErrors, email: "El email debe tener al menos 5 caracteres" };
            }
    
            setError({ phone: newErrors.phone, name: newErrors.name, email: newErrors.email });

            if (Object.keys($ticketItems).length < 1) {
                alert('No hay productos en el ticket');
            }
            return;
        } // No enviar el pedido si no está listo para enviar (por ejemplo, si falta un campo requerido
        setError({phone: "", name: "", email: ""});
        setSendingOrder(true); // Establecer sendingOrder a true al enviar el pedido
        

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
        });

        const user : User = {
            phone: phone,
            name: name,
            email: email,
        }

        const data : NewOrder = {
            items: ticket,
            outterItems: outterItems,
            phone: phone,
            name: name,
            email: email,
            user: user,
            couppon: couppon,
        };

        // console.log(data);

        const response = await sendOrder(data);
        // const response = true // Simular la respuesta de la solicitud

        // Actualizar el estado del pedido enviado y el envío del pedido
        setOrderSent(response);

        if (response) {
            // Limpiar los elementos del carrito después de enviar el pedido
            Object.values($ticketItems).map((ticketItem) => {
                const existingEntry = ticketItems.get()[ticketItem.id];
                ticketItems.setKey(ticketItem.id, undefined);
            });

            Object.values($outterItems).map((outterItem) => {
                removeOutterItem(outterItem.name);
            });
        }
            // Si la solicitud se completa correctamente, establecer sendingOrder a false
        setSendingOrder(false);
        
        
    };

    useEffect(() => {
        if (Object.keys($ticketItems).length > 0 && phone.length > 9 && name.length > 2 && email.length > 5) {
            setReadyToSend(true);
        } else {
            setReadyToSend(false);
        }
    }
    , [$ticketItems, phone, name, email]);

    return (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mb-8'>
            {sendingOrder && (
                <div className="text-center">
                <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-white fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only text-gray-900 dark:text-white">Enviando...</span>
                </div>
            </div>
            )}
            {orderSent ? (
                <div className="flex flex-col items-center justify-center text-green-500 font-medium my-24">
                    <div className='w-full container mx-auto my-8 p-8 rounded shadow-lg mb-8 flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-check" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M9 12l2 2l4 -4" />
                        </svg>
                        <p className="ml-2">Pedido enviado</p>
                    </div>
    
                    <div className="w-full container mx-auto my-8 p-8 rounded shadow-lg">
                        <h1 className="text-gray-900 text-2xl font-bold mb-6 flex items-center justify-center dark:text-white">Gracias!</h1>
                        <div className="flex items-center mb-8">
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-gray-900 text-lg font-semibold dark:text-white">
                                    Ya recibimos tu pedido 
                                </h2>
                                <p className="text-gray-900 dark:text-white">
                                    En un momento nos pondremos en contacto contigo para confirmar tu pedido vía Whatsapp o email.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="max-w-sm mx-auto">
                        <div className="mb-5">
                            {error.name && <p className="text-red-500 text-xs italic mb-2">{error.name}</p>}
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu nombre / Empresa</label>
                            <input 
                            type="text" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            name="name" 
                            onChange={(e) => setName(e.target.value)}
                            minLength={3}
                            required/>
                        </div>
                        <div className="mb-5">
                            {error.phone && <p className="text-red-500 text-xs italic mb-2">{error.phone}</p>}
                            <label htmlFor="tel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu Whatsapp</label>
                            <input 
                                type="tel" 
                                id="tel" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="55 4647 6943" 
                                name="tel" 
                                minLength={10}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-5">
                            {error.email && <p className="text-red-500 text-xs italic mb-2">{error.email}</p>}
                            <label htmlFor="tel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="ejemplo@gmail.com" 
                                name="email" 
                                onChange={(e) => setEmail(e.target.value)}
                                required/>
                        </div>
                        <div className="mb-5 mb-8">
                            <label htmlFor="tel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cupón</label>
                            <input 
                                type="text" 
                                id="coupon" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name="coupon" 
                                value={couppon}
                                onChange={(e) => setCouppon(e.target.value)}
                                required/>
                            </div>
                            <div className="flex items-start mb-5">
                        </div>
                        <button 
                            onClick={(e) => sendTicket(e)}
                            className="text-white bg-blue-700 mb-12 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                            >
                            Enviar pedido
                        </button>
                    </div>
                </div>
        )}
        </div>
    );
};