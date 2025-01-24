/* -------------------------- CREATE CART REQUEST -------------------------- */
interface CreateCartReq {
    cart_id?: string
    user_id: string;
    items: Item[]                          
}

/* -------------------------- CREATE CART RESPONSE -------------------------- */
interface CreateCartRes {
    cart_id?: string;                 
    user_id?: string; 
    created_at?: Date;
    updated_at?: Date;              
}

/* -------------------------- CREATE CART LINE ITEM REQUEST -------------------------- */
interface CreateCartLineItemReq {
    user_id?: string;               
    cart_id?: string;              
    product_id?: string;            
    quantity?: number;            
    price?: number;                        
}

/* -------------------------- CREATE CART LINE ITEM RESPONSE -------------------------- */
interface CreateCartLineItemRes {
    item_id: number;                  
    item_pid: string;                 
    user_id: string;               
    cart_id: string;              
    product_id: string;           
    quantity: number;            
    price: number;                
    created_at: Date;             
    updated_at: Date;         
}

/* -------------------------- ITEM -------------------------- */
interface Item{
    product_id: string;
    qty: number;
    price: number;
}

export {CreateCartReq, CreateCartRes,  CreateCartLineItemReq, CreateCartLineItemRes };
