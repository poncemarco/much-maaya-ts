import { atom } from 'nanostores';
import type { Address } from './types/locations';

export const userInfo = atom({
    name : "",
    email : "",
    address : {
        street : "",
        city : "",
        state : "",
        county : "",
        neighborhood : ""
    },
    phone : ""
});


