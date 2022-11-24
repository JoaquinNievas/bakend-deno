import { Router } from "../../deps.ts";
import {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../handlers/products.ts";

const router = new Router();

router.get("/", getProducts);
router.post("/", addProduct);

router.get("/:id", getProduct);
router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
