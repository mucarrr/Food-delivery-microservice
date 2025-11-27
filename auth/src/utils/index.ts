import type { RouteParams } from "../types/index.js";
import type { RequestHandler } from "express";

const catchAsync = (fn: RouteParams):RequestHandler => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
export default catchAsync;