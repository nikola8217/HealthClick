"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const not_authorized_error_1 = require("../errors/not-authorized-error");
const requireAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
        throw new not_authorized_error_1.NotAuthorizedError();
    }
    next();
};
exports.requireAuth = requireAuth;
