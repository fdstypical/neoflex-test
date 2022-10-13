import { BaseController } from './base.controller';

export abstract class BaseModule {
  constructor(protected readonly _controller: BaseController) {}
  public abstract register(): BaseModule;

  public get controller(): BaseController {
    return this._controller;
  }
}
