import { useState } from 'react';

export function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <>
            <span>{count}</span>
            <button className="border px-4 py-2 text-xl" onClick={() => setCount(count + 1)}>+</button>
            <button className="border px-4 py-2 text-xl" onClick={() => setCount(count - 1)}>-</button>
        </>
    );
}

