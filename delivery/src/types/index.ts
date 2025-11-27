import type { Request, Response, NextFunction } from "express";
export type RouteParams = (req: Request, res: Response, next: NextFunction) => Promise<void>;