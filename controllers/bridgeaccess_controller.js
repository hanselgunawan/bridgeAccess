/**
 * Created by hansel.tritama on 11/18/17.
 */
var bridgeAccessModel = require("../models/shop_model.js");
const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.render("cart_display");
});

router.get("/product_buy", function (req, res) {
    res.render("product_buy");
});

router.get("/product_categories", function (req, res) {
    bridgeAccessModel.selectAllCategoryName("bridge_goodsph_products", function (catData) {
        var catFilter = [];
        for(let i=0;i<catData.length;i++)
        {
            catFilter.push({"categoryid1": catData[i].categoryid1.replace('\\', ""), categoryLink: catData[i].categoryid1.replace('\\', "%5C%5C")});
        }
        bridgeAccessModel.selectAllProducts("bridge_goodsph_products", function (productData) {
            var obj = {
                category:catData,
                categoryFilter: catFilter,
                product: productData
                //categorySearchQuery: req.params.categorySearch.toString().replace("\\", "")
            };
            res.render("product_categories", obj);
        });
    });
});

router.get("/product_categories/pagination/:page", function (req, res) {
    bridgeAccessModel.selectAllCategoryName("bridge_goodsph_products", req.params.page, function (data) {
        var obj = {
            category: data
        };
        res.render("product_categories", obj);
    });
});

router.get("/product_categories/:category", function (req, res) {
    bridgeAccessModel.selectAllCategoryName("bridge_goodsph_products", function (data) {
        var obj = {
            category: data
        };
    });
    res.render("product_categories");
});

router.get("/product_categories/search/:itemSearch", function (req, res) {
    bridgeAccessModel.selectAllCategoryName("bridge_goodsph_products", function (catData) {
        bridgeAccessModel.findItem("bridge_goodsph_products", req.params.itemSearch, function (searchData) {
            if(req.params.itemSearch === "")
            {
                res.redirect("/product_categories");
            }
            else
            {
                var catFilter = [];
                for(let i=0;i<catData.length;i++)
                {
                    catFilter.push({"categoryid1": catData[i].categoryid1.replace('\\', ""), categoryLink: catData[i].categoryid1.replace('\\', "%5C%5C")});
                }
                var obj = {
                    itemSearch: searchData,
                    product: searchData,
                    category: catData,
                    categoryFilter: catFilter,
                    searchQuery: req.params.itemSearch
                };
                res.render("product_categories", obj);
            }
        });
    });
});

router.get("/product_categories/category/:categorySearch", function (req, res) {
    bridgeAccessModel.selectAllCategoryName("bridge_goodsph_products", function (catData) {
        bridgeAccessModel.findCategory("bridge_goodsph_products", req.params.categorySearch, function (categorySearchData) {
            if(req.params.categorySearch === "")
            {
                res.redirect("/product_categories");
            }
            else
            {
                console.log(catData);
                var catFilter = [];
                for(let i=0;i<catData.length;i++)
                {
                    catFilter.push({"categoryid1": catData[i].categoryid1.replace('\\', ""), categoryLink: catData[i].categoryid1.replace('\\', "%5C%5C")});
                }

                var obj = {
                    product: categorySearchData,
                    category:catData,
                    categoryFilter: catFilter,
                    categorySearchQuery: req.params.categorySearch.replace("\\\\", "")
                };
                res.render("product_categories", obj);
            }
        });
    });
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