/* ================================================================== */
/*  Product service — CRUD, categories, filtering                     */
/*                                                                    */
/*  Each function maps to one API endpoint under /api/Product.        */
/* ================================================================== */

import { api } from "../client";
import type {
  ApiResponse,
  PaginatedResponse,
  ProductQueryRequest,
  CategoryRequest,
  SubCategoryRequest,
  BulkApprovalRequest,
  ApiProduct,
  ApiCategory,
  ApiSubCategory,
} from "../types";

/* ------------------------------------------------------------------ */
/*  Product queries                                                    */
/* ------------------------------------------------------------------ */

/**
 * POST /api/Product/GetAllProducts
 *
 * The backend uses POST (not GET) so it can accept
 * a rich filter/sort/pagination object in the request body.
 */
export const getAllProducts = (query: ProductQueryRequest) =>
  api.post<ApiResponse<PaginatedResponse<ApiProduct>>>("/Product/GetAllProducts", { body: query });

/** GET /api/Product/GetProductById/{id} */
export const getProductById = (id: number) =>
  api.get<ApiResponse<ApiProduct>>(`/Product/GetProductById/${id}`);

/** GET /api/Product/GetProductsByVendor/{vendorId} */
export const getProductsByVendor = (vendorId: number) =>
  api.get<ApiResponse<ApiProduct[]>>(`/Product/GetProductsByVendor/${vendorId}`);

/** GET /api/Product/GetProductsBySubCategory/{subCategoryId} */
export const getProductsBySubCategory = (subCategoryId: number) =>
  api.get<ApiResponse<ApiProduct[]>>(`/Product/GetProductsBySubCategory/${subCategoryId}`);

/** GET /api/Product/GetProductsByPriceRange */
export const getProductsByPriceRange = (min: number, max: number) =>
  api.get<ApiResponse<ApiProduct[]>>("/Product/GetProductsByPriceRange", {
    params: { min, max },
  });

/* ------------------------------------------------------------------ */
/*  Product mutations (admin / vendor)                                 */
/* ------------------------------------------------------------------ */

/** POST /api/Product/CreateProduct — multipart form */
export const createProduct = (data: FormData, vendorId?: number) =>
  api.post<ApiResponse>("/Product/CreateProduct", {
    body: data,
    isFormData: true,
    params: vendorId !== undefined ? { VendorId: vendorId } : undefined,
  });

/** PUT /api/Product/UpdateProduct/{id} — multipart form */
export const updateProduct = (id: number, data: FormData) =>
  api.put<ApiResponse>(`/Product/UpdateProduct/${id}`, { body: data, isFormData: true });

/** DELETE /api/Product/DeleteProduct/{id} (soft delete) */
export const deleteProduct = (id: number) =>
  api.delete<ApiResponse>(`/Product/DeleteProduct/${id}`);

/** POST /api/Product/RestoreProduct/{id} */
export const restoreProduct = (id: number) =>
  api.post<ApiResponse>(`/Product/RestoreProduct/${id}`);

/** DELETE /api/Product/DeleteProductPermanently/{id} */
export const deleteProductPermanently = (id: number) =>
  api.delete<ApiResponse>(`/Product/DeleteProductPermanently/${id}`);

/** POST /api/Product/BulkProductApproval */
export const bulkProductApproval = (data: BulkApprovalRequest) =>
  api.post<ApiResponse>("/Product/BulkProductApproval", { body: data });

/* ------------------------------------------------------------------ */
/*  Categories                                                         */
/* ------------------------------------------------------------------ */

/** GET /api/Product/GetAllCategories */
export const getAllCategories = () =>
  api.get<ApiResponse<ApiCategory[]>>("/Product/GetAllCategories");

/** GET /api/Product/GetCategoryById?id={id} */
export const getCategoryById = (id: number) =>
  api.get<ApiResponse<ApiCategory>>("/Product/GetCategoryById", { params: { id } });

/** POST /api/Product/CreateCategory */
export const createCategory = (data: CategoryRequest) =>
  api.post<ApiResponse>("/Product/CreateCategory", { body: data });

/** PUT /api/Product/UpdateCategory */
export const updateCategory = (data: CategoryRequest) =>
  api.put<ApiResponse>("/Product/UpdateCategory", { body: data });

/* ------------------------------------------------------------------ */
/*  Sub-categories                                                     */
/* ------------------------------------------------------------------ */

/** GET /api/Product/GetAllSubCategories */
export const getAllSubCategories = () =>
  api.get<ApiResponse<ApiSubCategory[]>>("/Product/GetAllSubCategories");

/** GET /api/Product/GetSubCategoryById?id={id} */
export const getSubCategoryById = (id: number) =>
  api.get<ApiResponse<ApiSubCategory>>("/Product/GetSubCategoryById", { params: { id } });

/** GET /api/Product/GetAllSubCategoriesByCategoryId?categoryId={id} */
export const getSubCategoriesByCategoryId = (categoryId: number) =>
  api.get<ApiResponse<ApiSubCategory[]>>("/Product/GetAllSubCategoriesByCategoryId", {
    params: { categoryId },
  });

/** POST /api/Product/CreateSubCategory */
export const createSubCategory = (data: SubCategoryRequest) =>
  api.post<ApiResponse>("/Product/CreateSubCategory", { body: data });

/** PUT /api/Product/UpdateSubCategory */
export const updateSubCategory = (data: SubCategoryRequest) =>
  api.put<ApiResponse>("/Product/UpdateSubCategory", { body: data });
