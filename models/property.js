'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var fields = {
	parent: { 
        type: ObjectId,
        required: false 
    },
	name: {
        required: true, 
        type: String
    },
	optional: { 
        type: Boolean,
        required: false, 
        default: false
    },
	type: { 
        type: String,
        required: false        
    },
	editable: { 
        type: Boolean,
        required: false,
        default: false
    }    
};

var propertySchema = new Schema(fields);

module.exports = mongoose.model('Property', propertySchema);
