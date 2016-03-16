// Module dependencies.
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Apimeta = mongoose.models.Apimeta,
    api = {};

// ALL
api.apimetas = function (req, res) {
  Apimeta.find(function(err, apimetas) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({apimetas: apimetas});
    }
  });
};

// GET
api.apimeta = function (req, res) {
  var id = req.params.id;
  Apimeta.findOne({ '_id': id }, function(err, apimeta) {
    if (err) {
      res.status(404).json(err);
    } else {
      apimeta.populate('objects');
      res.status(200).json({apimeta: apimeta});
    }
  });
};

// POST
api.addApimeta = function (req, res) {

  var apimeta;

  if(typeof req.body.apimeta == 'undefined'){
    return res.status(500).json({message: 'apimeta is undefined'});
  }

  apimeta = new Apimeta(req.body.apimeta);

  apimeta.save(function (err) {
    if (!err) {
      console.log("created apimeta");
      return res.status(201).json(apimeta.toObject());
    } else {
      return res.status(500).json(err);
    }
  });

};

// PUT
api.editApimeta = function (req, res) {
  var id = req.params.id;

  Apimeta.findById(id, function (err, apimeta) {

    if (req.body.apimeta && req.body.apimeta.length && apimeta) {
        
        var body = req.body.apimeta[0];
        
        if(typeof body["layout"] != 'undefined'){
            apimeta["layout"] = body["layout"];
        }
    
        if(typeof body["objects"] != 'undefined'){
            apimeta["objects"] = body["objects"];
        }
        
        return apimeta.save(function (err) {
            if (!err) {
                console.log("updated apimeta");
                return res.status(200).json(apimeta.toObject());
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
api.deleteApimeta = function (req, res) {
  var id = req.params.id;
  return Apimeta.findById(id, function (err, apimeta) {
    return apimeta.remove(function (err) {
      if (!err) {
        console.log("removed apimeta");
        return res.status(204).send();
      } else {
        console.log(err);
        return res.status(500).json(err);
      }
    });
  });
};


router.get('/apimetas', api.apimetas);
router.post('/apimeta', api.addApimeta);

router.route('/apimeta/:id')
  .get(api.apimeta)
  .put(api.editApimeta)
  .delete(api.deleteApimeta);


module.exports = router;
