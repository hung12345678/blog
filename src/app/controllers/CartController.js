// const Course = require('../models/Course');
const session = require('express-session');
const {mongooseToObject} = require('../../util/mongoose');
const Course = require('../models/Course');
const Product = require('../models/Product');
const Cart = require('../models/cart');

class CartController {
    //get me/store/courses
   
    add(req, res, next) {
       var productId = req.params.id;
       var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
       Course.findById(productId, function(err, product){
            if(err){
                return res.redirect('/')
            }
            cart.add(product, product.id);
            req.session.cart = cart;
            // console.log(req.session.cart);
            res.redirect('/');
       });
      
    } 
    Minus(req, res, next){
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
        cart.reduceByOne(productId);
        req.session.cart = cart;
        res.redirect('/shop/shop-cart')
    } 
    Plus(req, res, next){
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
        
        cart.plusByOne(productId);
        req.session.cart = cart;
        res.redirect('/shop/checkout')
           //    res.json(req.body)
        //    Course.updateOne({ _id: req.params.id }, req.body)
        //    // redirect thêm key location trả về location me/store/courses tra network sẽ thấy
        //    .then(() => res.redirect('/shop/checkout'))
        //    .catch(next)

    } 
    remove(req, res, next){
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
        
        cart.removeItem(productId);
        req.session.cart = cart;
        res.redirect('/shop/checkout')
    }   

}
module.exports = new CartController();
