declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export interface CustomRequest<T = any> extends Request {
  query: T;
}
