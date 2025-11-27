import type { Request, Response, NextFunction } from 'express';
//error
export const errorMiddleware = (
    err: Error,
    req: Request, 
    res: Response, 
    next: NextFunction) => {
    console.error(err.message || "Something went wrong");
    res.status(500).json({ message: err.message || "Something went wrong" });
};
//404
export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Route not found" });
};