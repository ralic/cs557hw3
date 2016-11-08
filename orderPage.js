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
