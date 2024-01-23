import { fetchItems } from '../services/items'

async function getItems() {
    const items = await fetchItems();
    return items.map((item) => {
        return {
            title: item.name,
            price: item.price,
            unit: item.unit,
            id: item.id,
            image: item.image,
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