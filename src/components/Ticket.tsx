import { useStore } from '@nanostores/react';
import { ticketItems } from '../ticketStore';

export default function Ticket() {
    const $ticketItems = useStore(ticketItems);

    const total = Object.values($ticketItems).reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

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
                                    {ticketItem.quantity}
                                </td>
                                <td className='px-6 py-4'>
                                    {ticketItem.price}
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
                            <td className='px-6 py-4 text-center' colSpan={4}>
                                No hay productos en el ticket
                            </td>
                          </tr>
                     </tbody>
               )}
            </table>
        </div>
    )
}