const Router = require('express').Router();
const {celebrate, Joi, Segments} = require('celebrate');
const LogController = require('./controller');

Router.get('/:id/logs', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().required(),
    },
    [Segments.QUERY]: {
        page: Joi.string()
    },
    [Segments.HEADERS]: {
        'accept-encoding': Joi.string().required(),
        'user-agent': Joi.string().required(),
        'postman-token': Joi.string().required(),
        connection: Joi.string().required(),
        host: Joi.string().required(),
        accept: Joi.string().required(),
        authorization: Joi.string().required()
    }
}), LogController.getLogs);