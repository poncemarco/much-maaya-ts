import { useStore } from '@nanostores/react';
import { ticketItems, removeTicketItem, addTicketItem } from '../ticketStore';

export default function Ticket() {
    const $ticketItems = useStore(ticketItems);

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
        const existingEntry = ticketItems.get()[id];
        ticketItems.setKey(id, {
            ...existingEntry,
            quantity: existingEntry.quantity - 1
        });
    };


    return (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
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
                            Precio
                        </th>
                        <th scope="col" className="px-6 py-3">
                            
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Subtotal
                        </th>
                    </tr>
                </thead>
               { Object.values($ticketItems).length ? (
                <>
                    <tbody>
                        {Object.values($ticketItems).map((ticketItem) => (
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={ticketItem.id}>
                                <th scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {ticketItem.name}
                                </th>
                                <td className='px-6 py-4'>
                                    <button onClick={() => removeItemFromTicket(ticketItem.id)} className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                    </button>
                                    {ticketItem.quantity}
                                    <button onClick={() => addItemToTicket(ticketItem.id)} className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                    </button>
                                </td>
                                <td className='px-6 py-4'>
                                    {ticketItem.price.toFixed(2)}
                                </td>
                                <td className='px-6 py-4'>
                                    <button onClick={() => removeTicketItem(ticketItem.id)} className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                    </button>
                                </td>
                                <td className='px-6 py-4'>
                                    {Number(ticketItem.price * ticketItem.quantity).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={4} className="px-8 py-4 text-right font-medium text-gray-900 dark:text-white">
                                Total
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                {total.toFixed(2)}
                            </td>
                        </tr>
                    </tfoot>
                </>
               ) : (
                     <tbody>
                          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className='px-6 py-4 text-center' colSpan={5}>
                                No hay productos en el ticket
                            </td>
                          </tr>
                     </tbody>
               )}
            </table>
        </div>
    )
}