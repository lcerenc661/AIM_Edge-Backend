import express, { Router } from "express";
import fileUpload from 'express-fileupload';

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
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(fileUpload({
      limits: { fileSize: 50 * 1024 *1024}
    }))

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
