import { ExpressHandlerDescriptor } from '../types';

export default (useNext = false) => {
  return (
    target: any,
    key: string | symbol,
    descriptor: ExpressHandlerDescriptor,
  ): void => {
    const method = descriptor.value;

    descriptor.value = async function (...args) {
      try {
        if (method) await method.apply(this, args);
      } catch (error: any) {
        console.error(error);
        const [, res, next] = args;

        if (useNext && next) next();
        else {
          const statusCode: number = error?.status || 500;
          const message: string = error?.message || 'Something went wrong ;(';
          const stackTrace: Error[] = error?.stackTrace || [];
          const stackTraceMessages: string[] = stackTrace.map((error) => error.message);

          res.status(statusCode).json({
            message,
            ...(stackTrace.length > 0 ? { stackTrace: stackTraceMessages } : {}),
          });
        }
      }
    };
  };
};
