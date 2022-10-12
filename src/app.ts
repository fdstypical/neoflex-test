import express, { Application } from 'express';
import { config, Routes } from '../configs';

export class App {
  private static _instance: App;
  private _app: Application;

  private constructor(private readonly _port: number, private readonly _prefix: string) {
    this._app = express();
    this.initMiddlewares();
    this.initRoutes();
  }

  public static Instance(_port: number, _prefix: string): App {
    return this._instance || (this._instance = new this(_port, _prefix));
  }

  public run(): void {
    this._app.listen(this._port, () => console.log(`App listen on port: ${this._port}`));
  }

  private initMiddlewares(): void {
    this._app.use(express.json());
  }

  private initRoutes(): void {}
}

const app = App.Instance(config.PORT, config.API_PREFIX);
app.run();
