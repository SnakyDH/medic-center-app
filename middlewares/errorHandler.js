import boom from '@hapi/boom';

export const logErrors = (err, req, res, next) => {
  console.error(err);
  next(err);
};

export const boomErrorHandler = (err, req, res, next) => {
  console.log('Aqui esta boom');
  if (err.isBoom) {
    console.log('error boom');
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
};

export const errorHandler = (err, req, res, next) => {
  console.log('Lo capture aqui');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};
