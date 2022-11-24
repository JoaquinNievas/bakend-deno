import { Router } from "../../deps.ts";
import apiRouter from "./api.ts";

const router = new Router();

router.get("/", (context) => {
  context.response.body = "Hello Deno Server!";
});

router.use("/api", apiRouter.routes());

export default router;
