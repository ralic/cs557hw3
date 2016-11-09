var addInList = function (add) {
  itemListBox.innerHTML += add
}

/*
    Consumer function for each order
*/
var addOneRow = function (order) {
  addInList(
    '<tr>' +
    '<td>' + order.itemType + '</td>' +
    '<td>' + order.imgQuality + '</td>' +
    '<td>' + order.itemPrice + '</td>' +
    '<td>' + order.glossy + '</td>' +
    '<td>' + order.quantity + '</td>' +
    '<td>' + order.totalPrice + '</td>' +
    '<td>' + order.shipdate + '</td>' +
    '</tr>'
  )
}

var addAllRow = function () {
  JSON.parse(localStorage.shopCart)  // Return the array of the order.
    .map(order => addOneRow(order))
}

window.onload = function () {
  addInList('<tr>' +
    '<td>itemType</td>' +
    '<td>imgQuality</td>' +
    '<td>itemPrice</td>' +
    '<td>glossy</td>' +
    '<td>quantity</td>' +
    '<td>totalPrice</td>' +
    '<td>shipdate</td>' +
    '</tr>')
    addAllRow();
}



// {
//     "id": "VGh1IE5vdiAxMCAyMDE2IDEzOjQ2OjExIEdNVC0wODAwIChQU1QpaGFyZC1jb3B5LXByaW50",
//     "itemType": "hard-copy-print",
//     "imgQuality": "Good",
//     "itemPrice": 8.99,
//     "glossy": "Yes",
//     "quantity": 323,
//     "totalPrice": 3549.77,
//     "shipdate": "2016-11-10T21:46:11.272Z"
// }

// let addNewRow = function (shopCart) {
//   for (let i in shopCart) {
//       console.log(shopCart[i])
//     addInList(
//       '<tr>' +
//       '<td>' + shopCart[i].itemType + '</td>' +
//       '<td>' + shopCart[i].imgQuality + '</td>' +
//       '<td>' + shopCart[i].itemPrice + '</td>' +
//       '<td>' + shopCart[i].glossy + '</td>' +
//       '<td>' + shopCart[i].quantity + '</td>' +
//       '<td>' + shopCart[i].totalPrice + '</td>' +
//       '<td>' + shopCart[i].shipdate + '</td>' +
//       '</tr>'
//     )
//   }
// }