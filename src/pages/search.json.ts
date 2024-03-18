import { fetchItems, fetchCategories } from '../services/items';

async function getItems() {
    try {
        const items = await fetchItems();
        const categories = await fetchCategories();
        
        return {
            items: items,
            categories: categories
        };
    } catch (error) {
        console.error('Error fetching items or categories:', error);
        throw error; // Propaga el error para manejarlo más adelante si es necesario
    }
}

export async function GET({}) {
    try {
        const data = await getItems();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            },
        });
    } catch (error) {
        return new Response('Internal Server Error', {
            status: 500,
            headers: {
                "Content-Type": "text/plain"
            },
        });
    }
}
