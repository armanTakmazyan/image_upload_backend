const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ImageSchema = new mongoose.Schema({
	path: {
		type: String,
		required: true
	},
	logs: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Log',
		required: true
	}],
	createdAt: {
        type: Date,
        default: Date.now,
        required: true
	}
});

ImageSchema.plugin(mongoosePaginate);
const Image = mongoose.model('images', ImageSchema);

module.exports = Image;