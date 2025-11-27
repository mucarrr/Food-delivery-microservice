import type { JWTPayload } from './index.js';
//!!!! IMPORTANT !!!!
declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload;
        }
    }
}
export {};