window.onload = function () {
  var popChekboxbyID = function (tagid, list) {
    var tag = document.getElementById(tagid)
    for (var i in list) {
      var textnode = document.createTextNode(list[i])
      var opts = document.createElement('input')
      opts.type = 'checkbox'
      opts.name = tagid
      opts.value = list[i]
      opts.addEventListener('change', function () {
        var ckboxs = document.querySelectorAll('#GlossyFinish input[type="checkbox"]')
        for (var j in ckboxs) {
          ckboxs[j].checked = false
          this.checked = true
        }
      })
      tag.appendChild(opts)
      tag.appendChild(textnode)
    }
    tag.appendChild(document.createElement('hr'), tag.childNodes[0])
  }

  var glossyopts = ['Yes', 'No']
  popChekboxbyID('GlossyFinish', glossyopts)
}

var addToParentCart = function () {
  try {
    var queryItem = {}
    /*
        Note : Single selection of the input, use the id directly to acess the element.
    */
    queryItem.imgQuality = imgQuality.value
    /*
        Multiple selection of radio button/checkbox
        use :checked to get the required element and its value.
    */
    queryItem.itemType = document.querySelector('#TypesofItems input:checked').value
    queryItem.glossy = document.querySelector('#GlossyFinish input:checked').value
    if (QuantityofItems.value == '') {
      throw new Error('Please input quantity')
    } else {
      queryItem.quantity = Number(QuantityofItems.value)
    }
    var neworder = window.parent.createOrder(queryItem)
    window.parent.shopCart.push(neworder)
    localStorage.shopCart = JSON.stringify(window.parent.shopCart)
    /*
      Request Sibling Page to add one row
    */
    window.parent.cartPage
      // document.getElementById("cartPage")
      .contentWindow.addOneRow(neworder)
  } catch (e) {
    console.log(e)
    alert(e)
  }
}
