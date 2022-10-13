import { ExpressHandlerDescriptor } from '../types';

export default (useNext: boolean = false) => {
  return (target: any, key: string | Symbol, descriptor: ExpressHandlerDescriptor) => {
    const method = descriptor.value;

    descriptor.value = async function (...args) {
      try {
        if (method) await method.apply(this, args);
      } catch (error: any) {
        console.error(error);
        const [, res, next] = args;

        if (useNext && next) next();
        else
          res.status(400).json({ message: error?.message || 'Something went wrong ;(' });
      }
    };
  };
};