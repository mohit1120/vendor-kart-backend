/* -------------------------- GET SHIPMENT REQUEST -------------------------- */
interface GetShipmentReq {   
    tracking_no: string
}

/* -------------------------- GET SHIPMENT RESPONSE -------------------------- */
interface GetShipmentRes {
    shipment_id?: number;
    shipment_pid?: string;
    order_id?: string;
    order_item_id?: string;
    status?: string;
    tracking_no?: string;
    created_at?: Date;
    updated_at?: Date;
}

export { GetShipmentReq, GetShipmentRes }