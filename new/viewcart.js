/* 
 * Student Info: Name=YueHu, ID=12980
 * Subject: CS557C_HW04_Fall_2016
 * Author: YUE
 * Filename: viewcart.js
 * Date and Time: Oct 30, 2016 10:26:55 AM
 * Project Name: CS557C_HW4
 */


window.onload = function () {
// localhost was in JSON format.
    var clist = JSON.parse(localStorage.localcart);
    var tb = document.getElementById("CartList");
    tb.content = "";
    var tbadd = function (add) {
        tb.content += add;
    };
    tbadd("<tr>" +
            "<td>OrderID  </td>" +
            "<td>Item\nTypes   </td>" +
            "<td>Qty</td>" +
            "<td>Quality  </td>" +
            "<td>Glossy\nFinish</td>" +
            "<td>Ship\nDate</td>" +
            "</tr>");
    /*
     *
     * ORIGINAL DATA FORMAT
     order.itemtype = document.getElementById('ItemTypes').value;
     order.qty = document.getElementById('Quantity').value;
     order.imgQ = document.getElementById('ImgQuality').value;
     order.finish = document.getElementById('GlossyFinish').value;
     */

    var addall = function () {
        for (var i in clist) {
//        for (var j in clist[i]) {
            tbadd("<tr>" +
                    "<td>" + clist[i].id + "</td>" +
                    "<td>" + clist[i].itemtype + "</td>" +
                    "<td>" + clist[i].qty + "</td>" +
                    "<td>" + clist[i].imgQ + "</td>" +
                    "<td>" + clist[i].finish + "</td>" +
                    "<td>" + clist[i].shipdate.split("T")[0] + "</td>" +
                    "</tr>");
//        }
        }
    };
    addall();


//clist.map(tbadd("hi"));
    var tbupdate = function () {
        tb.innerHTML = tb.content;
        tb.content = "";
    };
    tbupdate();
// For testing purpose
    var listall = function () {
        for (var i in clist) {
            for (var j in clist[i]) {
                console.log("email -" + clist[i].email);
            }
        }
    };

//tb.innerHTML = "<tr>hi<td>hi2</td><td>hi3</td></Tr>";

    /*
     var opts = document.createElement("option");
     opts.value = USstates[i];
     opts.textContent = USstates[i];
     */
};