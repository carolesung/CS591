var express = require('express');
var router = express.Router();

/* GET request. */
router.get('/:string', function(req, res, next) {
    req.params["length"] = req.params.string.length;
    res.send(req.params);
});
/* POST request. */
router.post('/short', function(req, res){
    var string = req.body.string;
    var length = req.body.length;
    res.send('string: '+ string +' length: '+ length);
});
module.exports = router;
