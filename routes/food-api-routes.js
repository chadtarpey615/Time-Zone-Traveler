// Requiring our models
const db = require("../models");
const { Op } = require("sequelize")

module.exports = function (app) {


    
    app.get("/api/food", function (req, res) {
        //console.log(req);
        let query = {
            lat: {
                [Op.between]: [minLat, maxLat]
            },
            lng: {
                [Op.between]: [minLng, maxLng]
            }
        };
        db.Food.findAll({
            limit: 20,
            where: query,
            //include: [db.Author]
        }).then(function (dbPost) {
            res.json(dbPost);
        });

    });



  
    app.post("/api/food", function (req, res) {
        db.Food.create(req.body).then(function (dbPost) {
            res.json(dbPost);
        });

    });


    app.delete("/api/food/:id", function (req, res) {
        db.Food.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });
    app.put("/api/food", function (req, res) {
        db.Food.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbPost) {
                res.json(dbPost);
            });
    });

};
