/**
 * Created by hansel.tritama on 11/18/17.
 */
var bridgeAccessModel = require("../models/shop_model.js");
const express = require("express");
const url = require("url");
const router = express.Router();

function getCategory(catData)
{
    var subCategory = []
    var catObj = {};
    var categories = [];
    for(let i=0; i<catData.length; i++)
    {
        if (catData[i].categoryid2 === "" || catData[i].categoryid1 === "")
            continue;
        if(i !== catData.length-1 && catData[i].categoryid1 === catData[i+1].categoryid1)
        {
            subCategory.push({subcategory: catData[i].categoryid2.replace('\\', ''), subcategoryLink: catData[i].categoryid2.replace('\\', "%5C%5C")});
        }
        else if(i === catData.length-1 && catData[i].categoryid1 !== catData[i-1].categoryid1)
        {
            catObj['subcat'] = subCategory;
            catObj["key"] = catData[i-1].categoryid1.replace('\\', '');
            catObj["categoryLink"] = catData[i].categoryid1.replace('\\', "%5C%5C");
            categories.push(catObj);
            categories.push({"key": catData[i].categoryid1.replace('\\', ''), "cateogoryLink": catData[i].categoryid1.replace('\\', "%5C%5C"), 'subcat':{subcategory: catData[i].categoryid2.replace('\\', ''), subcategoryLink: catData[i].categoryid2.replace('\\', "%5C%5C")}});
            //catObj[catData[i].categoryid1] = [catData[i].categoryid2];
            //console.log(subCategory);
            catObj = {};
        }
        else
        {
            subCategory.push({subcategory: catData[i].categoryid2.replace('\\', ''), subcategoryLink: catData[i].categoryid2.replace('\\', "%5C%5C")});
            catObj["key"] = catData[i].categoryid1.replace('\\', '');
            catObj["categoryLink"] = catData[i].categoryid1.replace('\\', "%5C%5C");
            catObj["subcat"] = subCategory;
            categories.push(catObj);
            //console.log(subCategory);
            subCategory = [];
            catObj = {};
        }
        //console.log(i + ". " + catData[i].categoryid2);
    }
    return categories;
}

router.get("/", function (req, res) {
    res.render("cart_display");
});

router.get("/product_buy", function (req, res) {
    res.render("product_buy");
});

router.get("/product_categories", function (req, res) {
    bridgeAccessModel.selectAllCategoryAndSubcategoryName("bridge_goodsph_products", function (catData) {
        bridgeAccessModel.selectAllProducts("bridge_goodsph_products", function (productData) {
            var obj = {
                product: productData,
                categories: getCategory(catData)
            };
            //console.log(catObj);
            res.render("product_categories", obj);
        });
    });
});

router.get("/product_categories/pagination/:page", function (req, res) {
    bridgeAccessModel.selectAllCategoryAndSubcategoryName("bridge_goodsph_products", req.params.page, function (data) {
        var obj = {
            category: data
        };
        res.render("product_categories", obj);
    });
});

router.get("/product_categories/search/:itemSearch", function (req, res) {
    bridgeAccessModel.selectAllCategoryAndSubcategoryName("bridge_goodsph_products", function (catData) {
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
                    searchQuery: req.params.itemSearch,
                    categories: getCategory(catData)
                };
                res.render("product_categories", obj);
            }
        });
    });
});

router.get("/product_categories/category/:categorySearch", function (req, res) {
    bridgeAccessModel.selectAllCategoryAndSubcategoryName("bridge_goodsph_products", function (catData) {
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
                    categories: getCategory(catData),
                    categorySearchQuery: req.params.categorySearch.replace("\\\\", "")
                };
                res.render("product_categories", obj);
            }
        });
    });
});

router.get("/product_details/:id", function (req, res) {
    bridgeAccessModel.selectProduct("bridge_goodsph_products", req.params.id, function (productData) {
        var dropdownList = [];
        for(let i=0; i<productData[0].instock; i++)
        {
            dropdownList.push({dropdownValue: i+1});
        }
        var obj = {
            product: productData[0],
            dropdownArr: dropdownList
        };
        console.log(productData[0]);
        console.log(dropdownList);
        res.render("product_details", obj);
    });
});

router.get("/product_details", function (req, res) {
    bridgeAccessModel.selectProduct("bridge_goodsph_products", req.query.id, function (productData) {
        var dropdownList = [];
        for(let i=0; i<productData[0].instock; i++)
        {
            dropdownList.push({dropdownValue: i+1});
        }
        var obj = {
            product: productData[0],
            dropdownArr: dropdownList
        };
        var queryUrl = url.parse(req.url).query;
        if(req.query.search !== undefined && req.query.category === undefined)
        {
            obj["searchQuery"] = req.query.search;
        }
        else
        {
            // if(req.query.category.indexOf("'")!=="")
            // {
            //     obj["categorySearchQuery"] = req.query.category.replace("'", "%5C%5C'");
            // }
            let str = queryUrl.substring(queryUrl.lastIndexOf("=")+1, queryUrl.length);
            obj["categorySearchQuery"] = str.replace("%27", "%5C%5C'");
        }

        // console.log("HOHOHOHO: " + req.query.category.replace("&", "%26"));
        console.log("HAHAHAHA: " + obj.categorySearchQuery);
        // console.log("HEALTH: " + haha.category);
        // console.log(productData[0]);
        // console.log(req.query);
        // console.log(dropdownList);
        res.render("product_details", obj);
    });
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