var cart = require("../models/cart.js");
const express = require("express");
const url = require("url");
const router = express.Router();

exports.viewCart = async (req, res) => {
	var obj = {cart_content: await cart.view(1)}
	res.render("cart_display", obj);
	//res.json(obj)
};

exports.updateQuantity = async (req, res) => {
	//await cart.updateQuantity(req.query.cart_id, req.query.qty);
	console.log(req.body);
	let a = req.body['a[]'];
	let b = req.body['cid[]'];
	await cart.updateQuantity(b, a);
	res.redirect('/cart');
};

exports.deleteItem = async (req, res) => {
	await cart.delete(req.query.cart_id);
	res.redirect('/cart');
};

exports.insertItem = async (req, res) => {
	await cart.insert(1, req.query.item_id, req.query.qty)
	res.redirect('/cart');
};