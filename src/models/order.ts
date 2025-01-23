/* -------------------------- CREATE ORDER REQUEST -------------------------- */
interface CreateOrderReq {   
    order_id?: string;                 
    user_id: string;     
    items: Item[];         
    total_amount?: number;
}

/* -------------------------- CREATE ORDER RESPONSE -------------------------- */
interface CreateOrderRes {
    order_id?: string;                 
    user_id?: string;              
    total_amount?: number; 
    status?: string
    created_at?: Date;             
    updated_at?: Date;                 
}

/* -------------------------- GET ORDER REQUEST -------------------------- */
interface GetOrderReq {   
    order_id: string;                 
}

/* -------------------------- GET ORDER RESPONSE -------------------------- */
interface GetOrderRes {
    order_id?: string;                 
    user_id?: string;              
    total_amount?: number; 
    status?: string;
    created_at?: Date;             
    updated_at?: Date;                 
}

/* -------------------------- CREATE ORDER ITEM REQUEST -------------------------- */
interface CreateOrderItemReq {
    product_id: string;
    order_id?: string;           
    price: number;                
    qty: number;             
    user_id: string;              
    vendor_id: string;                 
}


/* -------------------------- CREATE ORDER ITEM RESPONSE -------------------------- */
interface CreateOrderItemRes {         
    order_item_id: string;                  
    order_id: string;             
    product_id: string;          
    price: number;                
    qty: number;             
    user_id: string;              
    vendor_id: string;              
}  

/* -------------------------- ITEM -------------------------- */
interface Item{
    product_id: string;
    qty: number;
    price: number;
}

export { CreateOrderReq, CreateOrderRes, GetOrderReq, GetOrderRes, CreateOrderItemReq, CreateOrderItemRes, Item };