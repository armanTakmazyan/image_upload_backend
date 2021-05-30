const Image = require("./model");
const Log = require("../logs/model");
const sharp = require('sharp');
const fs = require('fs');

module.exports = class ImageController {
  static async index(req, res) {
    const images = await Image.paginate({}, {page: req.query.page})

    return res.json({
      status: "ok",
      images,
    });
  }

  static async show(req, res) {
    const image = await Image.findById(req.params.id);

    if(!image) {
      return res.status(404).send("Not found.");
    }

    return res.json({
      status: "ok",
      image,
    });
  }

  static async create(req, res) {
    const actions = req.body.actions;

    const readable = fs.createReadStream(req.file.path);
    const writeStream = fs.createWriteStream(
      `uploads/${req.file.originalname}`
    );

    let transformer = sharp();

    if (actions.crop) {
      let { left, top, width, height } = actions.crop;
      left = Math.round(+left);
      top = Math.round(+top);
      width = Math.round(+width);
      height = Math.round(+height);

      transformer = transformer.extract({
        left: left,
        top: top,
        width: width,
        height: height,
      });
    }

    if (actions.resize) {
      let { width, height } = actions.resize;
      width = Math.round(+width);
      height = Math.round(+height);

      transformer = transformer.resize(width, height, { fit: sharp.fit.fill });
    }

    if (actions.blur) {
      let { percent } = actions.blur;
      percent = Math.round(+percent);

      if (percent >= 0.3 && percent <= 10) {
        transformer = transformer.blur(percent);
      }
    }

    readable.pipe(transformer).pipe(writeStream);
    fs.unlinkSync(req.file.path);

    const image = await Image.create({
      path: `uploads/${req.file.originalname}`,
    });

    const log = await Log.create({
      image: image._id.toString(),
      actions: actions,
    });

    image.logs.push(log);
    await image.save();

    return res.json({
      status: "ok",
      image: image,
    });
  }

  static async destroy(req, res) {
    const image = await Image.findById(req.params.id);
    if(!image) {
      return res.status(404).send("Not found.");
    }

    await image.remove();
    await Log.deleteMany({image: req.params.id})

    return res.json({
      status: "ok",
      image,
    });
  }
};