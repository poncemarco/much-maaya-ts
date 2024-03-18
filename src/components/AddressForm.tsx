import React, { useState, useEffect } from 'react';
import { fetchLocation } from '../services/locations';
import {type Location} from '../types/locations';

const AddressForm = () => {
    const [postalCode, setPostalCode] = useState('');
    const [ errorNotification, setErrorNotification ] = useState('');
    const [ neighborhoods, setNeighborhoods ] = useState<string[]>([]);
    const [ address, setAddress ] = useState({
        street: '',
        city: '',
        state: '',
        county: '',
        neighborhood: '',
    });

    function handlePostalCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPostalCode(event.target.value);
    }

    useEffect(() => {
        if (postalCode.length < 5) return;
    
        const fetchAddress = async () => {
            try {
                const response = await fetchLocation(postalCode);
                const neighborhoods = response.neighborhoods.map((neighborhood) => neighborhood.name);
                setAddress({
                    street: '',
                    city: '',
                    state: response.state,
                    county: response.county,
                    neighborhood: ''
                });
                setNeighborhoods(neighborhoods); // Actualizar el estado de neighborhoods
                setErrorNotification(''); // Limpiar cualquier notificación de error anterior
            } catch (error) {
                setErrorNotification('Error al obtener la dirección'); // Manejar errores de la solicitud
            }
        };
    
        fetchAddress();
    }, [postalCode]);



    return (
        <>
            <div className="max-w-sm mx-auto mb-8">
                <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código Postal</label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-900 dark:border-gray-600">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                        <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
                    </svg>
                    </span>
                    <input 
                        type="text" 
                        id="website-admin" 
                        className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="03430"
                        onChange={handlePostalCodeChange}
                        />
                </div>
            </div>
            {address.county && (
                <div className="max-w-sm mx-auto mb-8">
                <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alcaldía/Municipio</label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-900 dark:border-gray-600">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                        <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
                    </svg>
                    </span>
                    <input 
                        type="text" 
                        id="website-admin" 
                        className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        value={address.county}
                        onChange={handlePostalCodeChange}
                        />
                </div>
            </div>
            )}
            {neighborhoods.length > 0 && (
                <div className="max-w-sm mx-auto mb-8">
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecciona tu colonia</label>
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {neighborhoods.map((neighborhood) => (
                            <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                        ))}
                    </select>
                </div>
            )}
            {address.state && (
                <div className="max-w-sm mx-auto mb-8">
                <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Calle y número</label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-900 dark:border-gray-600">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                        <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
                    </svg>
                    </span>
                    <input 
                        type="text" 
                        id="website-admin" 
                        placeholder='Calle Benito Juárez #1234'
                        className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        onChange={(e) => setAddress({...address, street: e.target.value})}
                        />
                </div>
            </div>
            )}
        </>
    );
};

export default AddressForm;


