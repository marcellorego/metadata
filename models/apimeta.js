'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var fields = {
	layout: { 
        type: String,
        required: true
    },
	objects: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Object'
    }]
};

var apimetaSchema = new Schema(fields);

module.exports = mongoose.model('Apimeta', apimetaSchema);
