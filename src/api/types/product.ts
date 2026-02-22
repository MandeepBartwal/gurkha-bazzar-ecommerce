/* ================================================================== */
/*  Product, Category & SubCategory DTOs                              */
/*                                                                    */
/*  Mirrors the swagger schemas: ProductQueryDto, CreateCategoryDto,  */
/*  CreateSubCategoryDto, and the product objects returned by the API. */
/* ================================================================== */

/* ----------------------- Request DTOs ----------------------------- */

/**
 * POST /api/Product/GetAllProducts
 *
 * Despite being a GET-style query, the backend uses POST
 * to accept complex filter/sort/pagination in the body.
 */
export interface ProductQueryRequest {
    page: number;
    pageSize: number;
    categoryId?: number | null;
    vendorId?: number | null;
    subCategoryId?: number | null;
    search?: string | null;
    minPrice?: number | null;
    maxPrice?: number | null;
    sortBy?: string | null;
    sortOrder?: string | null;
    globalSearchQuery?: string | null;
}

/** POST /api/Product/CreateCategory & PUT UpdateCategory */
export interface CategoryRequest {
    id?: number | null;
    name: string;
    description?: string | null;
}

/** POST /api/Product/CreateSubCategory & PUT UpdateSubCategory */
export interface SubCategoryRequest {
    id?: number | null;
    name: string;
    description?: string | null;
    categoryId: number;
}

/** POST /api/Product/BulkProductApproval */
export interface BulkApprovalRequest {
    productIds: number[] | null;
}

/* ----------------------- Response DTOs ---------------------------- */

/** Product image nested inside a product response */
export interface ProductImage {
    id: number;
    imageUrl: string;
    isPrimary: boolean;
}

/** Single product returned by GetProductById / GetAllProducts */
export interface ApiProduct {
    id: number;
    productName: string;
    description: string;
    price: number;
    stockQuantity: number;
    subCategoryId: number;
    subCategoryName: string | null;
    categoryId: number;
    categoryName: string | null;
    vendorId: number;
    vendorName: string | null;
    isActive: boolean;
    isApproved: boolean;
    isComboType: boolean;
    comboProductIds: number[] | null;
    productImages: ProductImage[];
    createdDate: string;
    updatedDate: string | null;
}

/** Category object from GET /api/Product/GetAllCategories */
export interface ApiCategory {
    id: number;
    name: string;
    description: string | null;
    isActive: boolean;
}

/** SubCategory object from GET /api/Product/GetAllSubCategories */
export interface ApiSubCategory {
    id: number;
    name: string;
    description: string | null;
    categoryId: number;
    categoryName: string | null;
    isActive: boolean;
}
