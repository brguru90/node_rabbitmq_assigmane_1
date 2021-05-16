const express = require("express");
var router = express.Router();
var Users = require("../models/users")
var ObjectID = require('mongodb').ObjectID;



router.get("/test", async (req, res) => {
    console.log(global.rabbit) 
    res.send({
        msg: "Server running",
        msg_type: "success"
    })

})

router.get("/setRecord", async (req, res) => {

    const user = new Users({
        name: req.body.name,
        email: req.body.email,
    });
    user.save()
        .then(item => {
            global.rabbit.send(item["_id"].toString())
            res.status(200).json({
                msg: "saved to database",
                msg_type: "success"
            });
        })
        .catch(err => {
            res.status(400).send({
                msg: "unable to save to database",
                msg_type: "error"
            });
        });

})


router.get("/getRecord/:id", async (req, res) => {
    try {
        var query = { _id: ObjectID(req.params.id) };        
        Users.find(query).then((result, err) => {
            if (err) {
                res.send({
                    msg: JSON.stringify(err),
                    msg_type: "error"
                })
            }
            res.json(result)
        })
    } catch (error) {
        console.warn(error)
        res.send({
            msg: JSON.stringify(error),
            msg_type: "error"
        })
    }

})

router.get("/getRecord/", async (req, res) => {
    console.log(req.query)
    Users.find({}).then((result, err) => {
        if (err) {
            res.send({
                msg: JSON.stringify(err),
                msg_type: "error"
            })
        }
        res.json(result)
    })

})


router.get("/deleteRecord/:id", async (req, res) => {
    try {
        var query = { _id: ObjectID(req.params.id) };        

        Users.deleteOne({
            _id: query
        }, function (err, result) {
            if (err) throw err;
            if (result && result.deletedCount) {
                res.status(200).json({
                    msg: "user deleted successfully",
                    msg_type: "success"
                });
            } else {
                res.status(200).json({
                    msg: "record not found",
                    msg_type: "error"
                });
            }
        });
    } catch (error) {
        res.send({
            msg: JSON.stringify(error),
            msg_type: "error"
        })
    }

})

router.get("/deleteRecord/", async (req, res) => {
    try {
        Users.deleteMany({}, function (err, result) {
            if (err) throw err;
            if (result && result.deletedCount) {
                res.status(200).json({
                    msg: "user deleted successfully",
                    msg_type: "success"
                });
            } else {
                res.status(200).json({
                    msg: "record not found",
                    msg_type: "error"
                });
            }
        });
    } catch (error) {
        res.send({
            msg: JSON.stringify(error),
            msg_type: "error"
        })
    }

})



module.exports = router;