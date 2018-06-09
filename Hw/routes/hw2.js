var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// Schema Creation
var hw2Schema = mongoose.Schema({
    string: String,
    length: Number
});
// Compiling schema into Model
var Hw2 = mongoose.model('hw2', hw2Schema);

/* GET request.
* Question 1 */
router.get('/:string', function(req, res, next) {
    Hw2.find({string:req.params.string}, 'string length', function(err,hw2){
        if(err) return console.error(err);
        if(!hw2.length){
            var newStr = new Hw2({string:req.params.string, length:req.params.string.length});
            newStr.save(function(err,newStr){
                if(err) return console.error(err);
                res.json({string:newStr.string, length: newStr.length});
            })
        }else{
        res.json({string: hw2[0].string, length: hw2[0].length});}
    });
});

/* GET request.
Question 2   */
router.get('/', function(req,res){
    Hw2.find(function(err,strings){
        if (err) return console.error(err);
        res.json(strings)
    })
})
/* POST request.
*  Question 3  */
router.post('/', function(req,res){
    var string = req.body.string;
    var length = req.body.length;
    Hw2.find({string:string}, 'string length', function(err,hw2){
        if(!hw2.length){
            var newStr = new Hw2({string:string, length:length});
            newStr.save(function(err,newStr) {
                if (err) return console.error(err);
                res.json(newStr);
            })
        }else{
                res.json(hw2);
            }
    })
})

/* Delete request.
    Question 4
 */
router.delete('/:string', function(req,res){
    Hw2.find({string:req.params.string}, 'string length', function(err,hw2){
        if(err) return console.error(err);
        if(!hw2.length) {
            res.json({error: 'String not found!'})
        }
        else{
            Hw2.deleteOne({string:req.params.string}, function(err){});
            res.json({success: 'String deleted!'})
        }
    })
})

module.exports = router;
