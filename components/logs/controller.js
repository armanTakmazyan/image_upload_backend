const Log = require('./model');
const Image = require("../images/model");

module.exports = class ImageControllerLogController{
    static async getLogs(req, res) {
        const image = await Image.findById(req.params.id)
        
        if(!image) {
            return res.status(404).json({
                status: 'not found'
            });
        }

        const logs = await Log.paginate({image: req.params.id}, {sort: { createdAt: -1 }, page: req.query.page})
        
        return res.json({
            status: 'ok',
            logs,
        });
    }
}

