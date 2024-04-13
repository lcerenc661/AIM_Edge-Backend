import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import dotenv from 'dotenv';


dotenv.config();

(() => {
  main();
})();

function main() {
  const server = new Server({
    routes: AppRoutes.routes
  });

  server.start();
}
