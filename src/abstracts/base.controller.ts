import { Router } from 'express';
import { BaseService } from './base.service';

export abstract class BaseController<T extends BaseService = BaseService> {
  protected readonly _router: Router;

  constructor(protected readonly service: T) {
    this._router = Router();
  }

  public abstract register(): BaseController;

  public get router(): Router {
    return this._router;
  }
}
