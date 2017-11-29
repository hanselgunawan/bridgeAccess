/**
 * Created by hansel.tritama on 11/18/17.
 */
// var burgerModel = require("../models/burger.js");
const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    // burgerModel.selectAll("burgers", function (data) {
    //     var obj = {
    //         burgers:data
    //     };
    // });
    res.render("cart_display");
});

router.get("/product_buy", function (req, res) {
    // burgerModel.selectAll("burgers", function (data) {
    //     var obj = {
    //         burgers:data
    //     };
    // });
    res.render("product_buy");
});

router.get("/product_categories", function (req, res) {
    // burgerModel.selectAll("burgers", function (data) {
    //     var obj = {
    //         burgers:data
    //     };
    // });
    res.render("product_categories");
});

router.get("/product_details", function (req, res) {
    // burgerModel.selectAll("burgers", function (data) {
    //     var obj = {
    //         burgers:data
    //     };
    // });
    res.render("product_details");
});

router.get("/product_items", function (req, res) {
    // burgerModel.selectAll("burgers", function (data) {
    //     var obj = {
    //         burgers:data
    //     };
    // });
    res.render("product_items");
});

router.get("/product_list", function (req, res) {
    // burgerModel.selectAll("burgers", function (data) {
    //     var obj = {
    //         burgers:data
    //     };
    // });
    res.render("product_list");
});

router.get("/success_checkout", function (req, res) {
    // burgerModel.selectAll("burgers", function (data) {
    //     var obj = {
    //         burgers:data
    //     };
    // });
    res.render("success_checkout");
});

// router.post("/burger/insert", function (req, res) {
//     burgerModel.insertOne("burgers", "burgerName", "devouredStatus", "date", req.body.inputted_burger_name, function (data) {
//         res.redirect("/");
//     });
// });
//
// router.put("/burger/:burgerID", function (req, res) {
//     burgerModel.updateOne("burgers", "devouredStatus", req.params.burgerID, function (data) {
//         res.redirect("/");
//     });
// });

module.exports = router;