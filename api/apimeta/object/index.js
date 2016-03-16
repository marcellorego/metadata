// Module dependencies.
var express = require('express'),
    router = express.Router({mergeParams: true}),
    mongoose = require('mongoose'),
    apiRouter = require('./apimeta'),
    Object = mongoose.models.Object,
    api = {};

// ALL
api.objects = function (req, res) {
  Object.find(function(err, objects) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({objects: objects});
    }
  });
};

// GET
api.object = function (req, res) {
  var id = req.params.id;
  Object.findOne({ '_id': id }, function(err, object) {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json({object: object});
    }
  });
};

// POST
api.addObject = function (req, res) {

  var object;

  if(typeof req.body.object == 'undefined'){
    res.status(500).json({message: 'object is undefined'});
  }

  object = new Object(req.body.object);
  //object.populate('properties');
  
  object.save(function (err) {
    if (!err) {
      console.log("created object");
      return res.status(201).json(object.toObject());
    } else {
      return res.status(500).json(err);
    }
  });

};

// PUT
api.editObject = function (req, res) {
  var id = req.params.id;

  Object.findById(id, function (err, object) {

    if (req.body.object && req.body.object.length && object) {

        var body = req.body.object[0];
    
        if(typeof body["parent"] != 'undefined'){
            object["parent"] = body["parent"];
        }
    
        if(typeof body["name"] != 'undefined'){
            object["name"] = body["name"];
        }
    
        if(typeof body["extend"] != 'undefined'){
            object["extend"] = body["extend"];
        }
    
        if(typeof body["properties"] != 'undefined'){
            object["properties"] = body["properties"];
        }    

        return object.save(function (err) {
            if (!err) {
                console.log("updated object");
                return res.status(200).json(object.toObject());
            } else {
            return res.status(500).json(err);
            }
        });
    } else {
        console.log("apimeta not found");
        return res.status(404).send();
    }
  });

};

// DELETE
api.deleteObject = function (req, res) {
  var id = req.params.id;
  return Object.findById(id, function (err, object) {
    return object.remove(function (err) {
      if (!err) {
        console.log("removed object");
        return res.status(204).send();
      } else {
        console.log(err);
        return res.status(500).json(err);
      }
    });
  });

};


router.get('/object', api.objects);
router.post('/object', api.addObject);

router.route('/object/:id')
  .get(api.object)
  .put(api.editObject)
  .delete(api.deleteObject);

// you can nest routers by attaching them as middleware:
/*apiRouter.use('/apimeta/:apiId/object', router);
apiRouter.use('/apimeta/:apiId/object/:objectId', router);

itemRouter.route('/')
    .get(function (req, res) {
        res.status(200)
            .send('hello items from user ' + req.params.userId);
    });

itemRouter.route('/:itemId')
    .get(function (req, res) {
        res.status(200)
            .send('hello item ' + req.params.itemId + ' from user ' + req.params.userId);
    });*/

module.exports = router;
