import { Request, Response, NextFunction } from 'express';

export interface CalcDto {
  leftOperand: number;
  rightOperand: number;
}

export interface CalcResult {
  result: number;
}

export type ExpressHandlerDescriptor = TypedPropertyDescriptor<
  (req: Request, res: Response, next?: NextFunction) => any
>;
