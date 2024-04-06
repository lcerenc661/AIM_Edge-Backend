import express, { Router } from "express";

interface Options {
  routes: Router;
}

export class Server {
  private app = express();
  private readonly routes: Router;

  constructor(options: Options) {
    const { routes } = options;
    this.routes = routes;
  }

  async start() {
    //*Middlewares

    //*Routes
    this.app.use(this.routes);

    this.app.get("*", (req, res) => {
      console.log(req.url);
      res.status(400).send(`You are trying to reach ${req.url}, Bad request`);
    });

    this.app.listen(3000),
      () => {
        console.log(`Server running on port ${3000}`);
      };
  }
}
