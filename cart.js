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

var inherit = function (child, parent) {
  child.prototype = Object.create(parent.prototype)
}

// }
// function b64EncodeUnicode(str) {
//     return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
//         return String.fromCharCode('0x' + p1)
//     }))
// }
// function b64DecodeUnicode(str) {
//     return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
//     }).join(''))
// }

'use strict'
var itemList = []

var Orderable = function (id, a, b, c) {
  this.id = id
  this.itemType = a
  this.imgQuality = b
  this.itemPrice = c
  this.getShipdate = function () {
    if (this.type === 'Hard-copy prints' || 'Posters') {
      let res = new Date()
      res.setDate(res.getDate() + 1)
      return res
    }
    if (this.type === 'Coffee mugs' || 'T-shirts') {
      let res = new Date()
      res.setDate(res.getDate() + 2)
      return res
    }
  }
}

itemList.push(new Orderable(1, 'hard-copy-print', 'Good', 8.99))
itemList.push(new Orderable(2, 'hard-copy-print', 'Very Good', 9.99))
itemList.push(new Orderable(3, 'hard-copy-print', 'Excellent', 10.99))
itemList.push(new Orderable(4, 'poster', 'Good', 9.99))
itemList.push(new Orderable(5, 'poster', 'Very Good', 10.99))
itemList.push(new Orderable(6, 'poster', 'Excellent', 11.99))
itemList.push(new Orderable(7, 'coffee mug', 'Good', 10.99))
itemList.push(new Orderable(8, 'coffee mug', 'Very Good', 11.99))
itemList.push(new Orderable(9, 'coffee mug', 'Excellent', 12.99))
itemList.push(new Orderable(10, 'T-Shirt', 'Good', 11.99))
itemList.push(new Orderable(11, 'T-Shirt', 'Very Good', 12.99))
itemList.push(new Orderable(12, 'T-Shirt', 'Excellent', 13.99))

/*
    ShopCart Initialization
*/
var shopCart = []
window.onload = function () {
  if (localStorage.shopCart === undefined) {
    console.log('no localStorage.shopCart')
    // Initialize shopCart as empty array if there is nothing inside localStorage.
    shopCart = []
  } else {
    console.log('Existed localStorage.shopCart')
    // delete localStorage.shopCart
    // Copy existing shopcart into tmp shopCart
    shopCart = JSON.parse(localStorage.shopCart)
  }
}

/*
    For Testing createOrder function.

    var queryItemTest = {}
    queryItemTest.imgQuality = 'Very Good'
    queryItemTest.itemType = 'poster'
    queryItemTest.glossy = 'YES'
    queryItemTest.quantity = 3
*/

var createOrder = function (queryItem) {
  try {
    /* 
      Search for queryItem from itemList as an order
    */
    var order = itemList.find(searchable => (searchable.imgQuality == queryItem.imgQuality &&
      searchable.itemType === queryItem.itemType)
    )
    /*
       Set order qty and glossy requirement
    */
    order.glossy = queryItem.glossy
    order.quantity = queryItem.quantity
    /*
        Function to Calaculate orderPrice
    */
    let getOrderPrice = function () {
      var orderPrice = 0
      orderPrice += order.itemPrice * order.quantity
      if (glossy = 'YES') {
        orderPrice += 2 * order.quantity
      }
      return orderPrice
    }
    /*
      Get orderPrice of the order from order's help funciton : getOrderPrice
      Get shipdate of the order from Orderbale's getShipdate function 
    */
    order.totalPrice = getOrderPrice()
    order.shipdate = order.getShipdate()
    /*
      Encode id by using window.btoa
     // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/btoa
    */
    order.id = window.btoa(unescape(encodeURIComponent(order.shipdate + order.itemType)))
    console.log(order.id)
    return order
  } catch (e) {
    alert(e)
    console.log(e)
  }
}

/* Original idea for createOrder
// var order = new Orderable()
    // // 1) Dropdown Selector's value directly using its ID.
    // order.imgQuality = imgQuality.value
    // // 2) Multiple selection of radio button/checkbox
    // //    use :checked to get the required element and its value.
    // order.itemType = document.querySelector('#TypesofItems input:checked').value
    // order.glossyFinish = document.querySelector('#GlossyFinish input:checked').value
    // // 3) Single selection of the input, use the id direction to acess the element.
    // order.qty = Number(QuantityofItems.value)
    // var order = itemList.find(order => order.id === 1
*/

var updatePagebyID = function (page) {
  document.getElementById(page).contentWindow.location.reload()
}

/*
 *  Following codes are not necessary, just for functional testing.
 */

/* 
 * Demo functions for above data structure
 */

var showAllitems = function () {
  items.forEach(function (x) {
    console.log(x)
  })
}

var findPosters = function () {
  var item2 = items.filter(function (x) {
    return x.type === 'poster'
  })
  console.log(item2)
}
/*
 * Reference Code in case of using "Form"
 */

var getHttpReqObj = function () {
  var parseQueryString = function () {
    var str = window.location.search
    var objURL = {}

    str.replace(
      new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
      function ($0, $1, $2, $3) {
        objURL[$1] = $3
      }
    )
    return objURL
  }

  // Example how to use it: 
  var params = parseQueryString()
  console.log(params)
  return params
}
