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

router.get("/order_display", function (req, res) {
    res.render("order_display");
});

router.get("/product_buy", function (req, res) {
    res.render("product_buy");
});

exports.showProducts = (req, res) => {
    bridgeAccessModel.selectAllCategoryAndSubcategoryName("bridge_goodsph_products", function (catData) {
        bridgeAccessModel.selectAllProducts("bridge_goodsph_products", function (productData) {
            bridgeAccessModel.selectPriceRange("bridge_goodsph_products", function (priceRangeData){
                var obj = {
                    product: productData,
                    categories: getCategory(catData),
                    priceRange: priceRangeData[0]
                };
                res.render("product_categories", obj);
            });
        });
    });
};

exports.searchItem = (req, res) => {
    bridgeAccessModel.selectAllCategoryAndSubcategoryName("bridge_goodsph_products", function (catData) {
        bridgeAccessModel.findItem("bridge_goodsph_products", req.params.itemSearch, function (searchData) {
            if(req.params.itemSearch === "")
            {
                res.redirect("/shop/product_categories");
            }
            else
            {
                var catFilter = [];
                for(let i=0;i<catData.length;i++)
                {
                    catFilter.push({"categoryid1": catData[i].categoryid1.replace('\\', ""), categoryLink: catData[i].categoryid1.replace('\\', "%5C%5C")});
                }
            }
            bridgeAccessModel.selectPriceRangeBySearch("bridge_goodsph_products", req.params.itemSearch, function (priceRangeData){
                var obj = {
                    itemSearch: searchData,
                    product: searchData,
                    searchQuery: req.params.itemSearch,
                    categories: getCategory(catData),
                    priceRange: priceRangeData[0]
                };
                res.render("product_categories", obj);
            });
        });
    });
};

exports.filterByCategory = (req, res) => {
    bridgeAccessModel.selectAllCategoryAndSubcategoryName("bridge_goodsph_products", function (catData) {
        var catFilterStr = "";
        catFilterStr = req.params.categorySearch;
        bridgeAccessModel.findCategory("bridge_goodsph_products", req.params.categorySearch, function (categorySearchData) {
            if(req.params.categorySearch === "")
            {
                res.redirect("/shop/product_categories");
            }
            else
            {
                console.log(catData);
                var catFilter = [];
                for(let i=0;i<catData.length;i++)
                {
                    catFilter.push({"categoryid1": catData[i].categoryid1.replace('\\', ""), categoryLink: catData[i].categoryid1.replace('\\', "%5C%5C")});
                }
            }
            bridgeAccessModel.selectPriceRangeByCategory("bridge_goodsph_products", req.params.categorySearch, function (priceRangeData){
                var obj = {
                    product: categorySearchData,
                    category:catData,
                    categories: getCategory(catData),
                    categorySearchQuery: req.params.categorySearch.replace("\\\\", ""),
                    priceRange: priceRangeData[0],
                    categorySearchLink: catFilterStr
                };
                res.render("product_categories", obj);
            });
        });
    });
};

exports.filterBySubCategory = (req, res) => {
    bridgeAccessModel.selectAllCategoryAndSubcategoryName("bridge_goodsph_products", function (catData) {
        var subCatFilterStr = "";
        subCatFilterStr = req.params.subCategorySearch;
        bridgeAccessModel.findSubCategory("bridge_goodsph_products", req.params.subCategorySearch, function (categorySearchData) {
            if(req.params.subCategorySearch === "")
            {
                res.redirect("/shop/product_categories");
            }
            else
            {
                console.log(catData);
                var catFilter = [];
                for(let i=0;i<catData.length;i++)
                {
                    catFilter.push({"categoryid1": catData[i].categoryid1.replace('\\', ""), categoryLink: catData[i].categoryid1.replace('\\', "%5C%5C")});
                }
            }
            bridgeAccessModel.selectPriceRangeBySubcategory("bridge_goodsph_products", req.params.subCategorySearch, function (priceRangeData){
                var obj = {
                    product: categorySearchData,
                    category:catData,
                    categories: getCategory(catData),
                    subCategorySearchQuery: req.params.subCategorySearch.replace("\\\\", ""),
                    priceRange: priceRangeData[0],
                    subCategorySearchLink: subCatFilterStr
                };
                res.render("product_categories", obj);
            });
        });
    });
};

exports.filterByUserInput = (req, res) => {
    bridgeAccessModel.selectAllCategoryAndSubcategoryName("bridge_goodsph_products", function (catData) {
        var queryUrl = url.parse(req.url).query;
        var catFilterStr = "", subCatFilterStr = "", searchStr = "";
        if(req.query.search !== undefined && req.query.category === undefined && req.query.subcategory === undefined)
        {
            searchStr = queryUrl.substring(queryUrl.lastIndexOf("=")+1, queryUrl.length);
        }
        else if(req.query.search === undefined && req.query.category !== undefined && req.query.subcategory === undefined)
        {
            catFilterStr = queryUrl.substring(queryUrl.lastIndexOf("=")+1, queryUrl.length);

        }
        else if(req.query.search === undefined && req.query.category === undefined && req.query.subcategory !== undefined)
        {
            subCatFilterStr = queryUrl.substring(queryUrl.lastIndexOf("=")+1, queryUrl.length);
        }
        bridgeAccessModel.findByFilter("bridge_goodsph_products", req.query.min, req.query.max, catFilterStr.replace(";", "").replace(/%20/g, " ").replace(/%27/g,"\\\\\'"),
            subCatFilterStr.replace(";", "").replace(/%20/g, " ").replace(/%5C/g,"\\").replace(/%27/g,"\\'"), searchStr, function (filterData) {
                if(req.params.subCategorySearch === "")
                {
                    res.redirect("/shop/product_categories");
                }
                else
                {
                    console.log(catData);
                    var catFilter = [];
                    for(let i=0;i<catData.length;i++)
                    {
                        catFilter.push({"categoryid1": catData[i].categoryid1.replace('\\', ""), categoryLink: catData[i].categoryid1.replace('\\', "%5C%5C")});
                    }
                }
                bridgeAccessModel.selectPriceRangeByFilter("bridge_goodsph_products", req.query.min, req.query.max, catFilterStr.replace(";", "").replace(/%20/g, " ").replace(/%27/g,"\\\\\'"),
                    subCatFilterStr.replace(";", "").replace(/%20/g, " ").replace(/%5C/g,"\\").replace(/%27/g,"\\'"), searchStr, function (priceRangeData) {
                        var obj = {
                            product: filterData,
                            category:catData,
                            categories: getCategory(catData),
                            minPrice: req.query.min,
                            maxPrice: req.query.max,
                            priceRange: priceRangeData[0]
                        };
                        if(req.query.search !== undefined && req.query.category === undefined && req.query.subcategory === undefined)
                        {
                            obj["itemSearch"] = searchStr;
                            obj["searchQuery"] = searchStr;
                        }
                        else if(req.query.search === undefined && req.query.category !== undefined && req.query.subcategory === undefined)
                        {
                            obj["categorySearchQuery"] = catFilterStr.replace(/%20/g, " ").replace(/%27/g, "'").replace(/\\/g, "");
                            obj["categorySearchLink"] = catFilterStr;
                        }
                        else if(req.query.search === undefined && req.query.category === undefined && req.query.subcategory !== undefined)
                        {
                            obj["subCategorySearchQuery"] = subCatFilterStr.replace(/%20/g, " ").replace(/%27/g, "'").replace(/\\/g, "");
                            obj["subCategorySearchLink"] = subCatFilterStr;
                        }
                        res.render("product_categories", obj);
                    });
            });
    });
};

exports.showProductDetail = (req, res) => {
    bridgeAccessModel.selectProduct("bridge_goodsph_products", req.params.itemId, function (productData) {
        var dropdownList = [];
        for(let i=0; i<productData[0].instock; i++)
        {
            dropdownList.push({dropdownValue: i+1});
        }
        var obj = {
            product: productData[0],
            dropdownArr: dropdownList
        };
        res.render("product_details", obj);
    });
};

exports.successCheckout = (req, res) => {
    res.render("success_checkout");
};