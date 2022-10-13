import { BaseController } from '../../abstracts/base.controller';
import { BaseModule } from '../../abstracts/base.module';
import { CalcController } from './calc.controller';
import { CalcService } from './calc.service';

export class CalcModule extends BaseModule {
  constructor(controller: BaseController) {
    super(controller);
  }

  public register(): CalcModule {
    this._controller.register();
    return this;
  }
}

export default new CalcModule(new CalcController(new CalcService()));
