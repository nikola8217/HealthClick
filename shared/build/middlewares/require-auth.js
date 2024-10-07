"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const not_authorized_error_1 = require("../errors/not-authorized-error");
const requireAuth = (req, res, next) => {
    var _a;
    const token = (_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt;
    console.log('iz middlewara: ', token);
    if (!token) {
        throw new not_authorized_error_1.NotAuthorizedError();
    }
    next();
};
exports.requireAuth = requireAuth;
