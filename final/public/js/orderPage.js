var size = [];
var price = [];
var i = 0;
var sizeHtml = "";
function Ready(){
    $.ajax({
        type: "post",
        url: "/order",
        dataType: "json",
        data: {
            id: $("#proName").attr("pid")
        },
        async: false,
        success: function(data) {
            size = data["size"];
            price = data["price"];
        }
    })
}
$(document).ready(function() {
    $("#proSize").load('/order/' + $("proName").attr("pid"), function() {
        i = 0;
        Ready();
        console.log(price);
        for(var j = 0; j < size.length; j++) {
            sizeHtml += "<option value=" + j + ">" + size[j] + "</option>";
        }
        $("#proSize").html(sizeHtml);
        console.log(sizeHtml);
        //$("#proSize").html(sizeHtml);
        $("#price").text("$" + (parseFloat($("#count").val()) * parseFloat(price[i])).toString());
        $("#plusNum").click(function() {
            $("#count").val((parseInt($("#count").val())+ 1).toString());
            $("#price").text("$" + (parseFloat($("#count").val()) * parseFloat(price[i])).toString());
        });
        $("#minusNum").click(function() {
            $("#count").val(parseInt($("#count").val())- 1 > 0 ? (parseInt($("#count").val())- 1).toString() : 1);
            $("#price").text("$" + (parseFloat($("#count").val()) * parseFloat(price[i])).toString());
        });
        $("#proSize").change(function() {
            i = $(this).children('option:selected').val();
            $("#price").text("$" + (parseFloat($("#count").val()) * parseFloat(price[i])).toString());
        })
    });
})