const Log = require('./model');
const Image = require("../images/model");

module.exports = class ImageControllerLogController{
    static async getLogs(req, res) {
        const image = await Image.findById(req.params.id)
        
        if(!image) {
            return res.status(404).send("Not found.");
        }

        const logs = await Log.paginate({image: req.params.id}, {page: req.query.page})
        
        return res.json({
            status: 'ok',
            logs,
        });
    }
}

