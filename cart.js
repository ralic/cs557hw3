/* 
 * Student Info: Name=YueHu, ID=12980
 * Subject: CS557C_HW04_Fall_2016
 * Author: YUE
 * Filename: index.js.js
 * Date and Time: Oct 31, 2016 4:23:32 PM
 * Project Name: CS557C_HW4
 */

/* 
 * Create Data Strucure for items. (unit cell)
 */
'use strict';
var itemList = [];

var Orderable = function (id, a, b, c) {
    this.id = id;
    this.type = a;
    this.quantity = b;
    this.price = c;
};

itemList.push(new Orderable(1, 'hard-copy-print', 'Good', 8.99));
itemList.push(new Orderable(2, 'hard-copy-print', 'Very Good', 9.99));
itemList.push(new Orderable(3, 'hard-copy-print', 'Excellent', 10.99));
itemList.push(new Orderable(4, 'poster', 'Good', 9.99));
itemList.push(new Orderable(5, 'poster', 'Very Good', 10.99));
itemList.push(new Orderable(6, 'poster', 'Excellent', 11.99));
itemList.push(new Orderable(7, 'coffee mug', 'Good', 10.99));
itemList.push(new Orderable(8, 'coffee mug', 'Very Good', 11.99));
itemList.push(new Orderable(9, 'coffee mug', 'Excellent', 12.99));
itemList.push(new Orderable(10, 'T-Shirt', 'Good', 11.99));
itemList.push(new Orderable(11, 'T-Shirt', 'Very Good', 12.99));
itemList.push(new Orderable(12, 'T-Shirt', 'Excellent', 13.99));

var shopCart = [];

window.onload = function () {
    if (localStorage.shopCart === undefined) {
        // Initialize shopCart as empty array if there is nothing inside localStorage.
        shopCart = [];
        localStorage.shopCart = JSON.stringify(shopCart);
    } else {
        // Copy existing shopcart into tmp shopCart
        shopCart = localStorage.shopCart;
    }
};

var clearShopCart = function () {
    delete localStorage.shopCart;
    shopCart = [];
};

var createOrder = function () {
    try {
        var order = new Object();
        // 1) Dropdown Selector's value directly using its ID.
        order.imgQuality = imgQuality.value;
        // 2) Multiple selection of radio button/checkbox
        //    use :checked to get the required element and its value.
        order.itemType = document.querySelector('#TypesofItems input:checked').value;
        order.glossyFinish = document.querySelector('#GlossyFinish input:checked').value;
        // 3) Single selection of the input, use the id direction to acess the element.
        order.qty = Number(QuantityofItems.value);
    } catch (e) {
        alert(e);
        console.log(e);
    }
    return order;
};

var addOrderIntoCart = function () {
    try {
        var newOrder = createOrder();
        shopCart.push(newOrder);
        localStorage.shopCart=shopCart;
    } catch (e) {
        console.log(e);
    }
};


var updatePagebyID = function (page) {
    document.getElementById(page).contentWindow.location.reload();
};

/*
 *  Following codes are not necessary, just for functional testing.
 */

/* 
 * Demo functions for above data structure
 */

var showAllitems = function () {
    items.forEach(function (x) {
        console.log(x);
    });
};

var findPosters = function () {
    var item2 = items.filter(function (x) {
        return x.type === 'poster';
    });
    console.log(item2);
};
/*
 * Reference Code in case of using "Form"
 */

var getHttpReqObj = function () {

    var parseQueryString = function () {

        var str = window.location.search;
        var objURL = {};

        str.replace(
                new RegExp("([^?=&]+)(=([^&]*))?", "g"),
                function ($0, $1, $2, $3) {
                    objURL[ $1 ] = $3;
                }
        );
        return objURL;
    };

//Example how to use it: 
    var params = parseQueryString();
    console.log(params);
    return params;
};
