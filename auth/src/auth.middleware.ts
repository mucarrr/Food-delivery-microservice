import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from './auth.model.js';
import type { JWTPayload } from './types/index.js';
import type { IUser } from './types/index.js';
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
// validate token 
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
        if (!decoded) throw new Error("Unauthorized");
        const user = await User.findById(decoded.userId) as IUser;
        if (!user) throw new Error("Unauthorized");
        req.user = user;
        next();

    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: "Expired token" });
        }else{
            res.status(401).json({ message: "Invalid token" });
        }
        return;
    }
};