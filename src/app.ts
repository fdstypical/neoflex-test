import express, { Application } from 'express';
import { config } from '../configs';
import { BaseModule } from './abstracts/base.module';

import CalcModule from './modules/calc/calc.module';

export class App {
  private static _instance: App;
  private _app: Application;

  private constructor(
    private readonly _port: number,
    private readonly _prefix: string,
    private readonly modules: BaseModule[],
  ) {
    this._app = express();
    this.initMiddlewares();
    this.initRoutes();
  }

  public static Instance(_port: number, _prefix: string, modules: BaseModule[]): App {
    return this._instance || (this._instance = new this(_port, _prefix, modules));
  }

  public run(): void {
    this._app.listen(this._port, () => console.log(`App listen on port: ${this._port}`));
  }

  private initMiddlewares(): void {
    this._app.use(express.json());
  }

  private initRoutes(): void {
    for (const module of this.modules) {
      this._app.use(this._prefix, module.register().controller.router);
      this._app.use((_, res) =>
        res.status(404).json({ status: 404, message: 'Not Found' }),
      );
    }
  }
}

const app = App.Instance(config.PORT, config.API_PREFIX, [CalcModule]);
app.run();
