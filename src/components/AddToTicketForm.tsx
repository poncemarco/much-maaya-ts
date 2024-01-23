import { addTicketItem } from "../ticketStore";
import React from "react";
import type { TicketItemdisplayInfo } from "../ticketStore";


type Props = {
    item: TicketItemdisplayInfo;
};

export default function AddToTicketForm({ item }: Props) {

    function addToTicket(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        addTicketItem(item);
    }
}