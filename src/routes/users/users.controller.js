const express = require('express')
const usersController = express.Router()
const { AuthMiddleware } = require('../../middleware')
const { Validation } = require('../../utils')
const { ValidateBody, Schemas } = Validation

usersController.post(
    '/auth/register',
    ValidateBody(Schemas.RegisterUser),
    AuthMiddleware.register,
    AuthMiddleware.assignRole,
    AuthMiddleware.signRefreshTokenForUser,
    AuthMiddleware.signJWTForUser
)

usersController.post(
    '/auth/login',
    AuthMiddleware.signIn,
    AuthMiddleware.signRefreshTokenForUser,
    AuthMiddleware.signJWTForUser
)

usersController.post(
    '/auth/refresh',
    AuthMiddleware.requireRefreshToken,
    AuthMiddleware.signJWTForUser
)

usersController.get('/', AuthMiddleware.requireJWT, AuthMiddleware.getUser)

module.exports = usersController
