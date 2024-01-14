import { fetchItems } from '../services/items'

async function getItems() {
    const items = await fetchItems();
    return items.map((item) => {
        return {
            title: item.name,
            description: item.description,
            price: item.price,
            slug: item.slug,
            unit: item.unit,
            id: item.id,
        };
    });
}


export async function GET({}) {
    return new Response(JSON.stringify(await getItems()),
    {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        },
    });
} 