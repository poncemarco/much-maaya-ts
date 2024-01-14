// To parse this data:
//
//   import { Convert, Items } from "./file";
//
//   const items = Convert.toItems(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Items {
    links:        Links;
    start:        number;
    end:          number;
    count:        number;
    data:         Datum[];
    last_page:    number;
    current_page: number;
}

export interface Datum {
    id:             string;
    name:           string;
    description:    string;
    price:          number;
    discount_price: null;
    brand:          null | string;
    unit:           Unit;
    slug:           string;
    quantity:       number;
    category_title: CategoryTitle;
    image_url:      null | string;
}

export enum CategoryTitle {
    Desechable = "DESECHABLE",
    Higienicos = "HIGIENICOS",
    Jarceria = "JARCERIA",
    Limpieza = "LIMPIEZA",
}

export enum Unit {
    Caja = "CAJA ",
    Kg = "KG",
    Paquete = "PAQUETE ",
    Pza = "PZA",
}

export interface Links {
    next:     string;
    previous: null;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toItems(json: string): Items {
        return cast(JSON.parse(json), r("Items"));
    }

    public static itemsToJson(value: Items): string {
        return JSON.stringify(uncast(value, r("Items")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Items": o([
        { json: "links", js: "links", typ: r("Links") },
        { json: "start", js: "start", typ: 0 },
        { json: "end", js: "end", typ: 0 },
        { json: "count", js: "count", typ: 0 },
        { json: "data", js: "data", typ: a(r("Datum")) },
        { json: "last_page", js: "last_page", typ: 0 },
        { json: "current_page", js: "current_page", typ: 0 },
    ], false),
    "Datum": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "price", js: "price", typ: 3.14 },
        { json: "discount_price", js: "discount_price", typ: null },
        { json: "brand", js: "brand", typ: u(null, "") },
        { json: "unit", js: "unit", typ: r("Unit") },
        { json: "slug", js: "slug", typ: "" },
        { json: "quantity", js: "quantity", typ: 0 },
        { json: "category_title", js: "category_title", typ: r("CategoryTitle") },
        { json: "image_url", js: "image_url", typ: u(null, "") },
    ], false),
    "Links": o([
        { json: "next", js: "next", typ: "" },
        { json: "previous", js: "previous", typ: null },
    ], false),
    "CategoryTitle": [
        "DESECHABLE",
        "HIGIENICOS",
        "JARCERIA",
        "LIMPIEZA",
    ],
    "Unit": [
        "CAJA ",
        "KG",
        "PAQUETE ",
        "PZA",
    ],
};

export interface Order {
    items: Item[]
    total_price: number
    total_items: number
  }
  
  export interface Item {
    item: Item2
    quantity: number
    finished: boolean | null
    paid: boolean | null
    total_price: number
    id: number | null
  }
  

  export interface Order {
    items: Item[]
    total_price: number
    total_items: number
  }
  
  
  export interface Item2 {
    id: string
    name: string
    description: string
    price: number
    discount_price: any
    brand?: string
    unit: string
    slug: string
    quantity: number
    category_title: string
    image_url: string
  }

  export interface IDQuantityList {
    id: string,
    quantity: number
  }
  
  export interface NewOrder {
    items: IDQuantityList[]
    phone: string
    name: string
  }


