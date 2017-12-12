var connection = require("../config/connection.js");
// select s.item_id, p.name, s.quantity from shoppingCart s, bridge_goodsph_products p where s.item_id = p.id and status = 'CURRENT' AND s.account_id = 1;
var cart = {
	//VIEW PRODUCTS CURRENTLY IN THE CART
	view: (account_id) => {
		return new Promise ((resolve, reject) => {
			var q = `SELECT s.id, s.item_id, p.name, s.quantity, p.smallimage, p.price, p.instock 
					 FROM shoppingCart s, bridge_goodsph_products p 
					 WHERE s.item_id = p.id 
					 	AND status = 'CURRENT' 
					 	AND s.account_id = 1;`
			connection.query(q, (err, result) => {
				if (err) throw err;
				resolve(result);
			})
		})
	},
	//INSERT NEW PRODUCT TO SHOPPING CART
	insert: (account_id, item_id, qty) => {
		return new Promise ((resolve, reject) => {
			var q = `CALL updateCart(${account_id}, ${item_id}, ${qty});`
			connection.query(q, (err, result) => {
				if (err) throw err;
				resolve(result);
			})
		})
	},
	//DELETE ITEM FROM CART
	delete: (cart_id) => {
		return new Promise ((resolve, reject) => {
			var q = `UPDATE shoppingCart
					 SET status = "REMOVED", date_removed = current_time
					 WHERE id = ${cart_id};`
			connection.query(q, (err, result) => {
				if (err) throw err;
				resolve(result);
			})
		})
	},
	//UPDATE QUANTITY IN CART
	updateQuantity: (id_arr, qty_arr) => {
		return new Promise ((resolve, reject) => {
			q = '';
			for (let i = 0; i < id_arr.length; i++)
			{
				q += `UPDATE shoppingCart SET quantity = ${qty_arr[i]}, date_updated = NOW() WHERE id = ${id_arr[i]}; `
			}

			console.log(q);

			connection.query(q, (err, result) => {
				if (err) throw err;
				resolve(result);
			})
		})
	},
	//GET NUMBER OF ITEMS CURRENTLY IN CART
	cartCount: (account_id) => {
		return new Promise ((resolve, reject) => {
			var q = `SELECT count(id) AS 'count'
					 FROM shoppingCart
					 WHERE id = ${cart_id}`
			connection.query(q, (err, result) => {
				if (err) throw err;
				resolve(result);
			})
		})
	},
	page: (page_num, product_per_page) => {
		return new Promise((resolve, reject) => {
			var q = `SELECT id, name FROM bridge_goodsph_products LIMIT ${product_per_page} OFFSET ${product_per_page * (page_num-1)};`
			connection.query(q, (err, result) => {
				if (err) throw err;
				resolve(result)
			})

		})
	}
}

module.exports = cart;