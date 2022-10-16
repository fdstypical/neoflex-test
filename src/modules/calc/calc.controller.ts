import { Request, Response } from 'express';
import CatchErrors from '../../decorators/catch.errors';
import { CalcDto, IDict } from '../../types';
import { BaseController } from '../../abstracts/base.controller';
import { CalcService } from './calc.service';

export class CalcController<T extends CalcService> extends BaseController<T> {
  constructor(service: T) {
    super(service);
  }

  @CatchErrors()
  public sum(req: Request, res: Response): void {
    const dto = this.validateParams(req);
    res.status(200).json(this.service.sum(dto));
  }

  @CatchErrors()
  public sub(req: Request, res: Response): void {
    const dto = this.validateParams(req);
    res.status(200).json(this.service.sub(dto));
  }

  @CatchErrors()
  public mul(req: Request, res: Response): void {
    const dto = this.validateParams(req);
    res.status(200).json(this.service.mul(dto));
  }

  @CatchErrors()
  public div(req: Request, res: Response): void {
    const dto = this.validateParams(req, false);
    res.status(200).json(this.service.div(dto));
  }

  public register(): BaseController {
    this._router.get('/sum/:num1/:num2', this.sum.bind(this));
    this._router.get('/sub/:num1/:num2', this.sub.bind(this));
    this._router.get('/mul/:num1/:num2', this.mul.bind(this));
    this._router.get('/div/:num1/:num2', this.div.bind(this));
    return this;
  }

  private validateZeroDivision(dto: IDict<any>): void {
    const isIncludesZero = Object.values(dto).some((item) => item === 0);

    if (isIncludesZero) {
      throw new Error('Zero Division Error');
    }
  }

  private validateParams(req: Request, allowZero: boolean = true): CalcDto {
    const leftOperand = parseFloat(req.params.num1);
    const rightOperand = parseFloat(req.params.num2);

    if (Number.isNaN(leftOperand) || Number.isNaN(rightOperand)) {
      throw new Error('Bad request. Parameters must be a number.');
    }
    if (!allowZero) {
      this.validateZeroDivision({ rightOperand });
    }

    return {
      leftOperand,
      rightOperand,
    };
  }
}
