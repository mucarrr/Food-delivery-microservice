import catchAsync from './utils/index.js';
import AuthService from './auth.service.js';    
import { loginSchema, validateDTO } from './auth.dto.js';
import { registerSchema } from './auth.dto.js';
import { authenticate } from './auth.middleware.js';


export class AuthController {
    register = catchAsync(async (req, res, next) => {
        const body = await validateDTO(registerSchema, req.body);
        const user = await AuthService.register(body);
        res.cookie('token', user.token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 });
        res.status(201).json({
            status: 'success',
            data: user,
        });
    });
    login = catchAsync(async (req, res, next) => {
        const body = await validateDTO(loginSchema, req.body);
        const user = await AuthService.login(body);
        res.cookie('token', user.token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({
            status: 'success',
            data: user,
        });
    });
    logout = catchAsync(async (req, res, next) => {
        res.clearCookie('token');
        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully',
        });
    });
    profile = catchAsync(async (req, res, next) => {
        await authenticate(req, res, next);
        res.status(200).json({
            status: 'success',
            data: req.user,
        });
    });
}
export default new AuthController();