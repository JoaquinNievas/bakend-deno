import { Router } from "../../deps.ts";
import productsRouter from "./products.ts";

const router = new Router();

router.use("/products", productsRouter.routes());

export default router;
