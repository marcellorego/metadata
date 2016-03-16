// Module dependencies.
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Property = mongoose.models.Property,
    api = {};

// ALL
api.propertys = function (req, res) {
  Property.find(function(err, propertys) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({propertys: propertys});
    }
  });
};

// GET
api.property = function (req, res) {
  var id = req.params.id;
  Property.findOne({ '_id': id }, function(err, property) {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json({property: property});
    }
  });
};

// POST
api.addProperty = function (req, res) {

  var property;

  if(typeof req.body.property == 'undefined'){
    res.status(500).json({message: 'property is undefined'});
  }

  property = new Property(req.body.property);

  property.save(function (err) {
    if (!err) {
      console.log("created property");
      return res.status(201).json(property.toObject());
    } else {
      return res.status(500).json(err);
    }
  });

};

// PUT
api.editProperty = function (req, res) {
  var id = req.params.id;

  Property.findById(id, function (err, property) {


  
    if(typeof req.body.property["parent"] != 'undefined'){
      property["parent"] = req.body.property["parent"];
    }
  
    if(typeof req.body.property["name"] != 'undefined'){
      property["name"] = req.body.property["name"];
    }
  
    if(typeof req.body.property["optional"] != 'undefined'){
      property["optional"] = req.body.property["optional"];
    }
  
    if(typeof req.body.property["type"] != 'undefined'){
      property["type"] = req.body.property["type"];
    }
  
    if(typeof req.body.property["editable"] != 'undefined'){
      property["editable"] = req.body.property["editable"];
    }
  

    return property.save(function (err) {
      if (!err) {
        console.log("updated property");
        return res.status(200).json(property.toObject());
      } else {
       return res.status(500).json(err);
      }
    });
  });

};

// DELETE
api.deleteProperty = function (req, res) {
  var id = req.params.id;
  return Property.findById(id, function (err, property) {
    return property.remove(function (err) {
      if (!err) {
        console.log("removed property");
        return res.status(204).send();
      } else {
        console.log(err);
        return res.status(500).json(err);
      }
    });
  });

};


router.get('/propertys', api.propertys);
router.post('/property', api.addProperty);

router.route('/property/:id')
  .get(api.property)
  .put(api.editProperty)
  .delete(api.deleteProperty);


module.exports = router;
