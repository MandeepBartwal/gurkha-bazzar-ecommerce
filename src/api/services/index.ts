/* ================================================================== */
/*  Barrel export — import any service from `@/api/services`          */
/*                                                                    */
/*  Usage:                                                            */
/*    import { authService, productService } from "@/api/services";   */
/* ================================================================== */

import * as authService from "./authService";
import * as productService from "./productService";
import * as cartService from "./cartService";
import * as orderService from "./orderService";

export { authService, productService, cartService, orderService };
