const Router = require('express').Router();
const ImageController = require('./controller');
const LogController = require('../logs/controller');
const {celebrate, Joi, Segments} = require('celebrate');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/tmp'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({storage: storage});

Router.post('/', upload.single('image'), celebrate({
  [Segments.PARAMS]: {} 
}), ImageController.create);

Router.get('/', celebrate({
  [Segments.QUERY]: {
    page: Joi.string()
  } 
}), ImageController.index);

Router.get('/:id', celebrate({
  [Segments.PARAMS]: {
      id: Joi.string().required(),
  }
}), ImageController.show);

Router.delete('/:id', celebrate({
  [Segments.PARAMS]: {
      id: Joi.string().required(),
  }
}), ImageController.destroy);

Router.get('/:id/logs', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().required(),
    }
}), LogController.getLogs);

module.exports = Router;
