/* -------------------------- CREATE PRODUCT REQUEST -------------------------- */
interface CreateProductReq {
  product_id?: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  qty: number;
  vendor_id: string;
}

/* -------------------------- CREATE PRODUCT RESPONSE ------------------------- */
interface CreateProductRes {
  product_id?: string;
  category_id?: string;
  name?: string;
  description?: string;
  price?: number;
  qty?: number;
  vendor_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

/**--------------------------- GET PRODUCT REQUEST ------------------------------*/
interface GetProductReq {
  product_id: string;
}

/**--------------------------- GET PRODUCT RESPONSE ------------------------------*/
interface GetProductRes {
  product_id?: string;
  category_id?: string;
  name?: string;
  description?: string;
  price?: number;
  qty?: number;
  vendor_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

/**-------------------------- UPDATE PRODUCT REQUEST -----------------------------*/
interface UpdateProductReq {
  product_id: string;
  category_id?: string;
  name?: string;
  description?: string;
  price?: number;
  qty?: number;
  vendor_id?: string;
}

/**-------------------------- UPDATE PRODUCT RESPONSE -----------------------------*/
interface UpdateProductRes {
  product_id?: string;
  category_id?: string;
  name?: string;
  description?: string;
  price?: number;
  qty?: number;
  vendor_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

/**-------------------- LIST PRODUCT BY VENDOR REQUEST -----------------------------*/
interface ListProducts {
  vendor_id: string;
}

export { CreateProductReq, CreateProductRes, GetProductReq, GetProductRes, UpdateProductReq, UpdateProductRes, ListProducts };
