import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

function main() {
  const server = new Server({
    routes: AppRoutes.routes
  });

  server.start();
}
