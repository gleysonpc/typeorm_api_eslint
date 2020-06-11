import * as express from 'express';
import routes from './routes';
import * as cors from 'cors';

class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  private routes() {
    this.server.use(routes);
  }
}
export default new App().server;
