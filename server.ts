import { Application } from "./deps.ts";
import router from "./src/router/router.ts";

const app = new Application();

app.use(router.routes());

await app.listen({ port: 8000 });
