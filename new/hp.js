/* 
 * Student Info: Name=YueHu, ID=12980
 * Subject: CS557C_HW04_Fall_2016
 * Author: YUE
 * Filename: hp.js
 * Date and Time: Oct 30, 2016 10:19:36 AM
 * Project Name: CS557C_HW4
 */


var inherit = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};
"use strict";
var Order = function () {
    this.id = Math.floor(Math.random() * 1000);
    this.item = "";
    this.qty = 1;
    this.setitem = function (item) {
        if (typeof item === "string") {
            this.item = item;
            return true;
        } else {
            return false;
        }
    };
    this.setqty = function (qty) {
        if (typeof qty === "number") {
            this.qty = qty;
            return true;
        } else {
            return false;
        }
    };
};
inherit(Object, Order);
/*
 Use a Date object to calculate the date an item will be ready automatically, based on the current
 date. For example, hard-copy prints and posters should be ready one day from today, coffee
 mugs two days from today, T-shirts three days from today, and so on.
 */
var shipdate = function (req, res) {
    if (req === "Hard-copy prints" || req === "Posters") {
        res = new Date();
        res.setDate(res.getDate() + 1);
        return res;
    }
    if (req === "Coffee mugs" || req === "T-shirts") {
        res = new Date();
        res.setDate(res.getDate() + 2);
        return res;
    }
};
/*
 To order an item, the user selects the quality from the drop-down list and the type from the list
 box, check or uncheck Glossy Finish box, enters a quantity in the text book, and clicks the Add
 to Cart button.
 */
var addtocart = function (req, res) {
    event.preventDefault();
    try {
        var order = new Order(req);
        // Ensure order id is a new one.
        for (var i in cart) {
            while (cart[i].id === order.id) {
                order.id = Math.floor(Math.random() * 1000);
            }
        }
        order.itemtype = document.querySelector('#ItemTypes input:checked').value;
        order.qty = Number(neworder.Quantity.value);
        order.imgQ = document.querySelector('#ImgQuality_selector :checked').value;
        order.finish = document.querySelector('#GlossyFinish input:checked').value;
        order.shipdate = shipdate(order.itemtype);
        if (order.qty === 0) {
            throw new Error('Qty is zero !');
        }
        cart.push(order);
        var cartinfo = "\n[Info]OrderID:" + order.id +
                "\nItemType:" + order.itemtype +
                " \nQty:" + order.qty +
                " \nQuality:" + order.imgQ +
                " \nGlossyFinish:" + order.finish +
                " \nshipdate:" + order.shipdate + "";
        var infotag = document.getElementById('cartinfo');
        infotag.textContent = cartinfo;
        infotag.style.color = "lightgreen";
    } catch (e) {
        if (e instanceof Error) {
            var cartinfo = "Error happend in the form,\n\
                            Something is not selected,\n\n\
                            please check the form again !!" + e;
            var infotag = document.getElementById('cartinfo');
            infotag.textContent = cartinfo;
            infotag.style.color = "yellow";
        }
    }
    return;
};
var viewcart = function (req, res) {
    event.preventDefault();
    // Storage cart data in localstorage as a  single JSON object.
    localStorage.localcart = JSON.stringify(cart);
    console.log(localStorage.localcart);
    window.open("./viewcart.html", "_self");
};

var clearcart = function (req, res) {
    event.preventDefault();
    // Storage cart data in localstorage as a  single JSON object.
    delete localStorage.localcart;
    cart = [];
    return true;
};


var cUnitPrice = function (itemtype, qualitytype) {
//    console.log("test");
    for (var i in itemTypes) {
        if (itemtype === itemTypes[i]) {
            for (var j in imgQ) {
                if (qualitytype === imgQ.rank[j]) {
                    return imgQ[i][j];
                }
            }
        }
    }
    return false;
};

var calcost = function (req, res) {
    /*
     If the user clicks on the Calculate button, the cost of the selected item and the
     expected delivery date will be displayed in an output label on the same page.
     Then, the selected item will be added to the shopping cart, if the item is already
     in the cart, the quantity is added to the quantity.
     */
    var totalcost = 0;
    for (var i in cart) {
        totalcost += cUnitPrice(cart[i].itemtype, cart[i].imgQ) * cart[i].qty;
    }
    var costinfo = document.getElementById('costinfo');
    costinfo.textContent = "Total cost is " + totalcost;
    costinfo.style.color = "#f2c";

    return totalcost;
};
/*
 *  Quality is for object creation
 */
var Quality = function (l1, l2, l3) {
    if (typeof l1 === "number" &&
            typeof l2 === "number" &&
            typeof l3 === "number")
    {
        this[0] = l1;
        this[1] = l2;
        this[2] = l3;
        return true;
    }
    return false;
};
var popOptsbyID = function (tagid, list) {
    var tag = document.getElementById(tagid);
//    <select name="imageQuality" id="ImgQuality"></select>
    var selector = document.createElement("select");
    selector.id = tagid + "_selector";
    tag.appendChild(selector);
    var selector = document.getElementById(selector.id);
    for (var i in list) {
        // Generate option tags
        // Format : <option value="AL">AL</option>
        var opts = document.createElement("option");
        opts.name = tagid;
        opts.value = list[i];
        opts.textContent = list[i];
        selector.appendChild(opts);
    }
    tag.insertBefore(document.createElement("br"), tag.childNodes[0]);
    tag.appendChild(document.createElement("br"), tag.childNodes[0]);
};
var popRadiosbyID = function (tagid, list) {
    var tag = document.getElementById(tagid);
    for (var i in list) {
        var opts = document.createElement("input");
        // Add buttons
        // Control attributes
        // Method-1 : opts.setAttribute("type", "radio");
        // Method-2 :
        opts.type = "radio";
        opts.name = tagid;
        opts.value = list[i];
        tag.appendChild(opts);
        // Add text after button
        var textnode = document.createTextNode(list[i]);
        tag.appendChild(textnode);
        // Add line break after button
//        tag.appendChild(document.createElement("br"));
    }
    // Add hr beofre and after button lists.
    tag.insertBefore(document.createElement("hr"), tag.childNodes[0]);
    tag.appendChild(document.createElement("hr"), tag.childNodes[0]);
};
var popChekboxbyID = function (tagid, list) {
    var tag = document.getElementById(tagid);
    for (var i in list) {
        var textnode = document.createTextNode(list[i]);
        var opts = document.createElement("input");
        opts.type = "checkbox";
        opts.name = tagid;
        opts.value = list[i];
        opts.addEventListener('change', function () {
            var ckboxs = document.querySelectorAll('#GlossyFinish input[type="checkbox"]');
            for (var j in ckboxs) {
                ckboxs[j].checked = false;
                this.checked = true;
            }
        });
        tag.appendChild(opts);
        tag.appendChild(textnode);
    }
    tag.appendChild(document.createElement("hr"), tag.childNodes[0]);
};
window.onload = function () {
    itemTypes = {};
    // itemType and imgQuality mapping
    // itemType[0] has imgQ[0], which is a Quality object with 3 levels.
    itemTypes[0] = "Hard-copy prints";
    itemTypes[1] = "Posters";
    itemTypes[2] = "Coffee mugs";
    itemTypes[3] = "T-shirts";
    imgQ = {};
    imgQ.rank = ["Good", "Very good", "Excellent"];
    // Creat Quality index
    imgQ[0] = new Quality(8.99, 9.99, 10.99);
    imgQ[1] = new Quality(9.99, 10.99, 11.99);
    imgQ[2] = new Quality(10.99, 11.99, 12.99);
    imgQ[3] = new Quality(11.99, 12.99, 13.99);
    var glossyopts = ["Yes", "No", "TBD"];
    popOptsbyID('ImgQuality', imgQ.rank);
    popRadiosbyID('ItemTypes', itemTypes);
    popChekboxbyID('GlossyFinish', glossyopts);
    console.log(itemTypes);
    console.log(imgQ);
    ordercounts = 0;
    if (localStorage.localcart !== undefined) {
        cart = JSON.parse(localStorage.localcart);
    } else {
        cart = [];
    }
    document.getElementById('AddToCart').addEventListener('click', addtocart);
    document.getElementById('ViewCart').addEventListener('click', viewcart);
    document.getElementById('ClearCart').addEventListener('click', clearcart);
    document.getElementById('howmuch').addEventListener('click', calcost);
};
/*
 *  Following are examples to test inheritance
 */


var Orders99 = {};
var genOrders99 = function () {
    Orders99['I' + 0] = inherit(Object, Order)();
//    Layers10.L1 = inherit(Layers10.L0.constructor, Order2)();
    for (var i = 1; i < 100; i++) {
        var k = i - 1;
        Orders99['I' + i] = inherit(
                Orders99['I' + k].constructor,
                Order
                )();
    }
    console.log("Orders99=" + JSON.stringify(Orders99));
};
//genOrders99(); // Uncomment for test.

var Order2 = function () {
    this.id = Math.floor(Math.random() * 1000);
    this.item2 = new Order();
    this.qty2 = 2;
};
inherit(Order, Order2);
var Order3 = function () {
    this.id = Math.floor(Math.random() * 1000);
    this.item3 = new Order2();
    this.qty3 = 3;
};
inherit(Order2, Order3);
var Test = function () {
    console.log("[INFO]Running Inheritance Test");
    console.log("Test()= " + Test);
    var a = new Order();
    var b = new Order2();
    var c = new Order3();
    console.log("Invoking Test()");
    console.log("JSON.stringify(a):" + JSON.stringify(a));
    console.log("JSON.stringify(b):" + JSON.stringify(b));
    console.log("JSON.stringify(c):" + JSON.stringify(c));
    return true;
};
//Test(); // Uncomment for test.