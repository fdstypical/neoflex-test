import { BaseService } from '../../abstracts/base.service';
import { CalcDto, CalcResult } from 'src/types';

export class CalcService extends BaseService {
  public sum(dto: CalcDto): CalcResult {
    return { result: dto.leftOperand + dto.rightOperand };
  }

  public sub(dto: CalcDto): CalcResult {
    return { result: dto.leftOperand - dto.rightOperand };
  }

  public mul(dto: CalcDto): CalcResult {
    return { result: dto.leftOperand * dto.rightOperand };
  }

  public div(dto: CalcDto): CalcResult {
    return { result: dto.leftOperand / dto.rightOperand };
  }
}
