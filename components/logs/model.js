const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const LogSchema = new mongoose.Schema({
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
    required: true,
  },
  actions: {
    resize: {
      required: false,	
      width: {
      	type: Number,
      	// required: true
      },
      height: {
      	type: Number, 
      	// required: true
      },
      aspectRatio: {
      	type: String, 
      	// required: true
      }
    },
    crop: {
      required: false,	
      top: {
        type: Number,
        // required: true,
      },
      left: {
        type: Number,
        // required: true,
      },
      width: {
        type: Number,
        // required: true,
      },
      height: {
        type: Number,
        // required: true,
      },
    },
    blur: {
      required: false,		
      percent: {
      	type: String,
        // required: true,
      }	
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

LogSchema.plugin(mongoosePaginate);
const Log = mongoose.model('logs', LogSchema);

module.exports = Log;
