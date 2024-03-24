import type React from "react";

export interface OrderResponse {
    success: boolean;
    id?: number | null;
    discount?: number | null;
}

export interface OrderState {
    success: boolean;
    id?: number | null;
    discount?: number | null;
    setOrderResponse: React.Dispatch<
    React.SetStateAction<{
        success: boolean;
        id?: number | null;
        discount?: number | null;
      }>
      >;
}

