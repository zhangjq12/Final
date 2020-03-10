var nameEmpty = false;
var boothIdEmpty = false;
var artistEmpty = false;
var contentEmpty = false;
var lighting = {};
var graphic = {};
var accessories = {};
var furniture = {};
var electricFile;
var designFile;
var datas = {
    carpet: {
        name: "",
        unit: "",
        color: "",
        otherColor: ""
    },
    panel: {
        name: "",
        unit: "",
        details: ""
    },
    lighting: {
        details: [],
        other: {}
    },
    electricity: {
        filename: ""
    },
    graphic: {
        details: [],
        other: {}
    },
    display: {
        details: [],
        other: {}
    },
    furniture: {
        details: [],
        other: {}
    },
    accessories: {
        details: [],
        other: {}
    },
    showsite: {
        details: [],
        other: {}
    }
};
$('#newTabs').submit(function(){
    window.event.preventDefault();
    //$(this).find(':button[type=submit]').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...');
    //$(this).find(':button[type=submit]').prop('disabled', true);
});
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                //$("#tabSubmit").prop('disabled', true);
                event.stopPropagation();
            }
            else {
                event.preventDefault();
                $("#modifytabDia").modal('show');
                $(this).find(':button[type=submit]').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...');
                $(this).find(':button[type=submit]').prop('disabled', true);
            }
            form.classList.add('was-validated');
        }, false);
        });
    }, false);
})();
//bootstrapValidate("input[type='text']", 'required: This can not be empty!');
/*bootstrapValidate('#showName', 'required: This can not be empty!', function(isEmpty) {
    if(isEmpty == true) {
        nameEmpty = true; 
        if(nameEmpty && boothIdEmpty)
            $("#tabSubmit").attr('disabled', false);
        else
            $("#tabSubmit").attr('disabled', true);
    } 
    else 
    if(isEmpty == 0) {
        nameEmpty = false;
        $("#tabSubmit").attr('disabled', true);
    }
});
bootstrapValidate('#boothId', 'required: This can not be empty!', function(isEmpty) {
    if(isEmpty == true) {
        boothIdEmpty = true; 
        if(nameEmpty && boothIdEmpty)
            $("#tabSubmit").attr('disabled', false);
        else
            $("#tabSubmit").attr('disabled', true);
    } 
    else 
    if(isEmpty == 0) {
        boothIdEmpty = false;
        $("#tabSubmit").attr('disabled', true);
    }
});*/
/*bootstrapValidate('#artistName', 'required: This can not be empty!', function(isEmpty) {
    if(isEmpty == true) {
        artistEmpty = true; 
        if(nameEmpty && songEmpty && artistEmpty && contentEmpty)
            $("#tabSubmit").attr('disabled', false);
        else
            $("#tabSubmit").attr('disabled', true);
    } 
    else 
    if(isEmpty == 0) {
        artistEmpty = false;
        $("#tabSubmit").attr('disabled', true);
    }
});
bootstrapValidate('#details', 'required: This can not be empty!', function(isEmpty) {
    if(isEmpty == true) {
        contentEmpty = true; 
        if(nameEmpty && contentEmpty)
            $("#tabSubmit").attr('disabled', false);
        else
            $("#tabSubmit").attr('disabled', true);
    } 
    else 
    if(isEmpty == 0) {
        contentEmpty = false;
        $("#tabSubmit").attr('disabled', true);
    }
});*/
$(".input-daterange").datepicker({
    format: 'yyyy-mm-dd',
    clearBtn: true,
    todayHighlight: true,
    orientation: "bottom left"
});
/*$("#furBtn").click(function() {
    if($("#Furniture").is(":checked")) {
        $("#furNumDiv").show();
    }
    else {
        $("#furNumDiv").hide();
    }
});
$("#graBtn").click(function() {
    if($("#Graphic").is(":checked")) {
        $("#graNumDiv").show();
    }
    else {
        $("#graNumDiv").hide();
    }
});
$("#carBtn").click(function() {
    if($("#Carpet").is(":checked")) {
        $("#carNumDiv").show();
    }
    else {
        $("#carNumDiv").hide();
    }
});
$("#hanBtn").click(function() {
    if($("#HangingSign").is(":checked")) {
        $("#hanNumDiv").show();
    }
    else {
        $("#hanNumDiv").hide();
    }
});
$("#ligBtn").click(function() {
    if($("#Lighting").is(":checked")) {
        $("#ligNumDiv").show();
    }
    else {
        $("#ligNumDiv").hide();
    }
});
$("#avBtn").click(function() {
    if($("#AV").is(":checked")) {
        $("#avNumDiv").show();
    }
    else {
        $("#avNumDiv").hide();
    }
});
$("#eleBtn").click(function() {
    if($("#Electric").is(":checked")) {
        $("#eleNumDiv").show();
    }
    else {
        $("#eleNumDiv").hide();
    }
});
$(".categories").find("label[id^='product']").each(function() {
    $(this).click(function() {
        if($(this).find("input[type='checkbox']").is(":checked") && $(this).parent().find("ul").find("li").length > 0) {
            $(this).parent().find("ul").show();
        }
        else {
            $(this).parent().find("ul").hide();
        }
    })
});*/
$("input[type='radio'][name='carpetOption']").change(function() {
    datas.carpet.name = this.value.split("+")[0];
    datas.carpet.unit = this.value.split("+")[1];
});
$("input[type='radio'][name='carpetColorOption']").change(function() {
    datas.carpet.color = this.value;
    if(this.value == "Other") {
        $("input[id='carpetOtherInput']").removeAttr("disabled");
        $("input[id='carpetOtherInput']").prop("required", true);
        $("input[id='carpetOtherInput']").val("");
    }
    else {
        $("input[id='carpetOtherInput']").removeAttr("required");
        $("input[id='carpetOtherInput']").attr("disabled", "true");
        $("input[id='carpetOtherInput']").val("");
    }
});
$("input[id='carpetOtherInput']").change(function() {
    datas.carpet.otherColor = this.value;
})
/*$("input[type='radio'][name='flooringOption']").change(function() {
    datas.flooring.name = this.value.split("+")[0];
    datas.flooring.unit = this.value.split("+")[1];
    $("#flooringDetails").show();
    $("input[name='flooringDetail']").prop("checked", false);
    $("input[name='flooringDetail']:eq(0)").prop("checked", true);
    datas.flooring.details = $("input[name='flooringDetail']:eq(0)").val();
});
$("input[type='radio'][name='flooringDetail']").change(function() {
    datas.flooring.details = this.value;
});*/

$("input[type='radio'][name='panelOption']").change(function() {
    datas.panel.name = this.value.split("+")[0];
    datas.panel.unit = this.value.split("+")[1];
    if(this.value.split("+")[0] == "Other") {
        $("input[id='panelOtherInput']").removeAttr("disabled");
        $("input[id='panelOtherInput']").prop("required", true);
        $("input[id='panelOtherInput']").val("");
        datas.panel.name = "";
    }
    else {
        $("input[id='panelOtherInput']").removeAttr("required");
        $("input[id='panelOtherInput']").prop("disabled", true);
        $("input[id='panelOtherInput']").val("");
    }
    $("#panelDetails").show();
    $("input[name='panelDetail']").prop("checked", false);
    $("input[name='panelDetail']:eq(0)").prop("checked", true);
    datas.panel.details = $("input[name='panelDetail']:eq(0)").val();
});
$("input[type='radio'][name='panelDetail']").change(function() {
    datas.panel.details = this.value;
});
$("input[id='panelOtherInput']").change(function() {
    datas.panel.name = this.value;
})

/*$("input[type='radio'][name='recieptionOption']").change(function() {
    datas.recieption.name = this.value;
    if(this.value == "Yes") {
        $("#recieptionDetails").show();
        $("input[name='recieptionDetail']").prop("checked", false);
        $("input[name='recieptionDetail']:eq(0)").prop("checked", true);
        $("input[id^='recieptionSize']").prop("required", true);
        datas.recieption.details = $("input[name='recieptionDetail']:eq(0)").val();
    }
    else {
        $("#recieptionDetails").hide();
        datas.recieption.details = "";
        datas.recieption.size = "";
    }
});
$("input[type='radio'][name='recieptionDetail']").change(function() {
    datas.recieption.unit = this.value.split("--")[1];
    datas.recieption.details = this.value.split("--")[0];
});

$("input[id='recieptionSize1']").change(function() {
    recieptionSize1 = this.value;
});
$("input[id='recieptionSize2']").change(function() {
    recieptionSize2 = this.value;
});
$("input[id='recieptionSize3']").change(function() {
    recieptionSize3 = this.value;
});

$("input[type='radio'][name='showcaseOption']").change(function() {
    datas.showcase.name = this.value;
    if(this.value == "Yes") {
        $("#showcaseDetails").show();
        $("input[name='showcaseDetail']").prop("checked", false);
        $("input[name='showcaseDetail']:eq(0)").prop("checked", true);
        $("input[id^='showcaseSize']").prop("required", true);
        datas.showcase.details = $("input[name='showcaseDetail']:eq(0)").val();
    }
    else {
        $("#showcaseDetails").hide();
        datas.showcase.details = "";
        datas.showcase.size = "";
    }
});
$("input[type='radio'][name='showcaseDetail']").change(function() {
    datas.showcase.unit = this.value.split("--")[1];
    datas.showcase.details = this.value.split("--")[0];
});

$("input[id='showcaseSize1']").change(function() {
    showcaseSize1 = this.value;
});
$("input[id='showcaseSize2']").change(function() {
    showcaseSize2 = this.value;
});
$("input[id='showcaseSize3']").change(function() {
    showcaseSize3 = this.value;
});*/

$("input[type='checkbox'][id^='light']").change(function() {
    var pre = this.value.split("+")[0];
    var post = this.value.split("+")[1];
    if(this.checked) {
        $(this).parent().parent().find(".lightingDetail").show();
        $(this).parent().parent().find("input[type='text']").prop("required", true);
        if(pre == "Other") {
            $("#lightOtherInput").removeAttr("disabled");
            $("#lightOtherInput").prop("required", true);
            $("#lightOtherInput").val("");
            datas.lighting.other = {name: "", unit: post, num: 0.0};
        }
        else {
            datas.lighting.details.push({name: pre, unit: post, num: 0.0});
        }
    }
    else {
        $(this).parent().parent().find("input[type='text']").val("");
        $(this).parent().parent().find("input[type='text']").removeAttr("required");
        if(pre == "Other") {
            $("#lightOtherInput").removeAttr("required");
            $("#lightOtherInput").prop("disabled", true);
            $("#lightOtherInput").val("");
            datas.lighting.other = {};
        }
        else {
            for(var i = 0; i < datas["lighting"]["details"].length; i++) {
                if(datas["lighting"]["details"][i]["name"] == pre) {
                    datas.lighting.details.splice(i, 1);
                    break;
                }
            }
        }
        $(this).parent().parent().find(".lightingDetail").hide();
    }
    //console.log(datas.lighting);
});
$(".lightingDetail").each(function() {
    $(this).find("input[type='text']").parent().parent().find("input[type='text']").change(function() {
        var num = this.value;
        var name = $(this).parent().parent().parent().find("input[type='checkbox']").val().split("+")[0];
        if(name == "Other") {
            datas.lighting.other.num = parseFloat(num);
        }
        else {
            for(var i = 0; i < datas["lighting"]["details"].length; i++) {
                if(datas["lighting"]["details"][i]["name"] == name) {
                    datas["lighting"]["details"][i]["num"] = parseFloat(num);
                }
            }
        }
    });
});
$("#lightOtherInput").change(function() {
    datas.lighting.other.name = this.value;
});

$("input[id='electricUpload']").change(function() {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        $("#electricPreview").attr("src", e.target.result);
    }
    reader.readAsDataURL(file);
    electricFile = file;
});

$("input[type='checkbox'][id^='graphic']").change(function() {
    var pre = this.value.split("+")[0];
    var post = this.value.split("+")[1];
    if(this.checked) {
        $(this).parent().parent().find(".graphicDetail").show();
        $(this).parent().parent().find("input[type='text']").prop("required", true);
        if(pre == "Other") {
            $("#graphicOtherInput").removeAttr("disabled");
            $("#graphicOtherInput").prop("required", true);
            $("#graphicOtherInput").val("");
            datas.graphic.other = {name: "", unit: post, num: 0.0};
        }
        else {
            datas.graphic.details.push({name: pre, unit: post, num: 0.0});
        }
    }
    else {
        $(this).parent().parent().find("input[type='text']").val("");
        $(this).parent().parent().find("input[type='text']").removeAttr("required");
        if(pre == "Other") {
            $("#graphicOtherInput").removeAttr("required");
            $("#graphicOtherInput").prop("disabled", true);
            $("#graphicOtherInput").val("");
            datas.graphic.other = {};
        }
        else {
            for(var i = 0; i < datas["graphic"]["details"].length; i++) {
                if(datas["graphic"]["details"][i]["name"] == pre) {
                    datas.graphic.details.splice(i, 1);
                    break;
                }
            }
        }
        $(this).parent().parent().find(".graphicDetail").hide();
    }
    //console.log(datas.graphic)
});
$(".graphicDetail").each(function() {
    $(this).find("input[type='text']").parent().parent().find("input[type='text']").change(function() {
        var num = this.value;
        var name = $(this).parent().parent().parent().find("input[type='checkbox']").val().split("+")[0];
        if(name == "Other") {
            datas.graphic.other.num = parseFloat(num);
        }
        else {
            for(var i = 0; i < datas["graphic"]["details"].length; i++) {
                if(datas["graphic"]["details"][i]["name"] == name) {
                    datas["graphic"]["details"][i]["num"] = parseFloat(num);
                }
            }
        }
    });
});
$("#graphicOtherInput").change(function() {
    datas.graphic.other.name = this.value;
})

$("input[type='checkbox'][name='displayOption']").change(function() {
    if(this.id == "display1080pTV") {
        if(this.checked) {
            $("#display1080TVOptions").show();
            $("#display1080TVOptions").find("input[type='text']").val("");
            $("#display1080TVOptions").find("input[type='text']").prop("required", true);
            datas.display.details.push({name: "1080p TV", unit: "piece", size: 0.0, num: 0.0});
        }
        else {
            for(var i = 0; i < datas["display"]["details"].length; i++) {
                if(datas["display"]["details"][i]["name"] == "1080p TV") {
                    datas.display.details.splice(i, 1);
                    break;
                }
            }
            $("#display1080TVOptions").find("input[type='text']").removeAttr("required");
            $("#display1080TVOptions").hide();
        }
    }
    else 
    if(this.id == "display4KTV") {
        if(this.checked) {
            $("#display4KTVOptions").show();
            $("#display4KTVOptions").find("input[type='text']").val("");
            $("#display4KTVOptions").find("input[type='text']").prop("required", true);
            datas.display.details.push({name: "4K TV", unit: "piece", size: 0.0, num: 0.0});
        }
        else {
            for(var i = 0; i < datas["display"]["details"].length; i++) {
                if(datas["display"]["details"][i]["name"] == "4K TV") {
                    datas.display.details.splice(i, 1);
                    break;
                }
            }
            $("#display4KTVOptions").find("input[type='text']").removeAttr("required");
            $("#display4KTVOptions").hide();
        }
    }
    else 
    if(this.id == "displaySpeaker&Mic") {
        if(this.checked) {
            $("#displaySpeakerMicOptions").show();
            $("#displaySpeakerMicOptions").find("input[type='text']").val("");
            $("#displaySpeakerMicOptions").find("input[type='text']").prop("required", true);
            datas.display.details.push({name: "Speaker&Mic", unit: "piece", num: 0.0});
        }
        else {
            for(var i = 0; i < datas["display"]["details"].length; i++) {
                if(datas["display"]["details"][i]["name"] == "Speaker&Mic") {
                    datas.display.details.splice(i, 1);
                    break;
                }
            }
            $("#displaySpeakerMicOptions").find("input[type='text']").removeAttr("required");
            $("#displaySpeakerMicOptions").hide();
        }
    }
    else
    if(this.id == "displayOther") {
        if(this.checked) {
            $("#displayOtherOptions").show();
            $("#displayOtherOptions").find("input[type='text']").val("");
            $("#displayOtherOptions").find("input[type='text']").prop("required", true);
            $("#displayOtherInput").removeAttr("disabled");
            $("#displayOtherInput").prop("required", true);
            datas.display.other = {name: "", unit: "piece", num: 0.0};
        }
        else {
            datas.display.other = {};
            $("#displayOtherInput").removeAttr("required");
            $("#displayOtherInput").prop("disabled", true);
            $("#displayOtherInput").val("");
            $("#displayOtherOptions").find("input[type='text']").removeAttr("required");
            $("#displayOtherOptions").hide();
        }
    }
    //console.log(datas.display);
});
$("#displayOtherInput").change(function() {
    datas.display.other.name = this.value;
})
$("#Size1080TV").change(function() {
    var size = this.value;
    for(var i = 0; i < datas["display"]["details"].length; i++) {
        if(datas["display"]["details"][i]["name"] == "1080p TV") {
            datas["display"]["details"][i]["size"] = parseFloat(size);
            break;
        }
    }
});
$("#Quantity1080TV").change(function() {
    var num = this.value;
    for(var i = 0; i < datas["display"]["details"].length; i++) {
        if(datas["display"]["details"][i]["name"] == "1080p TV") {
            datas["display"]["details"][i]["num"] = parseFloat(num);
            break;
        }
    }
});
$("#Size4KTV").change(function() {
    var size = this.value;
    for(var i = 0; i < datas["display"]["details"].length; i++) {
        if(datas["display"]["details"][i]["name"] == "4K TV") {
            datas["display"]["details"][i]["size"] = parseFloat(size);
            break;
        }
    }
});
$("#Quantity4KTV").change(function() {
    var num = this.value;
    for(var i = 0; i < datas["display"]["details"].length; i++) {
        if(datas["display"]["details"][i]["name"] == "4K TV") {
            datas["display"]["details"][i]["num"] = parseFloat(num);
            break;
        }
    }
});
$("#QuantitySpeakerMic").change(function() {
    var num = this.value;
    for(var i = 0; i < datas["display"]["details"].length; i++) {
        if(datas["display"]["details"][i]["name"] == "Speaker&Mic") {
            datas["display"]["details"][i]["num"] = parseFloat(num);
            break;
        }
    }
});
$("#QuantityDisplayOther").change(function() {
    var num = this.value;
    datas.display.other.num = parseFloat(num);
});
/*$("input[type='radio'][name='display1080TVOption']").change(function() {
    datas.display.details = this.value;
});
$("input[type='radio'][name='display4KTVOption']").change(function() {
    datas.display.details = this.value;
});*/

/*$("input[type='radio'][name='furnitureOption']").change(function() {
    datas.furniture.name = this.value.split("+")[0];
    datas.furniture.unit = this.value.split("+")[1];
    if(this.id == "furnitureSofa") {
        $("#furnitureSofaOptions").show();
        $("#furnitureTableOptions").hide();
        $("#furnitureChairOptions").hide();
        $("input[name='furnitureSofaOption']").prop("checked", false);
        $("input[name='furnitureSofaOption']:eq(0)").prop("checked", true);
        datas.furniture.details = $("input[name='furnitureSofaOption']:eq(0)").val();
    }
    else 
    if(this.id == "furnitureTable") {
        $("#furnitureSofaOptions").hide();
        $("#furnitureTableOptions").show();
        $("#furnitureChairOptions").hide();
        $("input[name='furnitureTableOption']").prop("checked", false);
        $("input[name='furnitureTableOption']:eq(0)").prop("checked", true);
        datas.furniture.details = $("input[name='furnitureTableOption']:eq(0)").val();
    }
    else {
        $("#furnitureSofaOptions").hide();
        $("#furnitureTableOptions").hide();
        $("#furnitureChairOptions").show();
        $("input[name='furnitureChairOption']").prop("checked", false);
        $("input[name='furnitureChairOption']:eq(0)").prop("checked", true);
        datas.furniture.details = $("input[name='furnitureChairOption']:eq(0)").val();
    }
    //console.log(datas.display);
});

$("input[type='radio'][name='furnitureSofaOption']").change(function() {
    datas.furniture.details = this.value;
});
$("input[type='radio'][name='furnitureTableOption']").change(function() {
    datas.furniture.details = this.value;
});
$("input[type='radio'][name='furnitureChairOption']").change(function() {
    datas.furniture.details = this.value;
});*/

$("input[type='checkbox'][name='furnitureOption']").change(function() {
    var name = this.value.split("+")[0];
    //var unit = this.value.split("+")[1];
    if(this.id == "furnitureSofa") {
        if(this.checked) {
            //var obj = {name: name, unit: unit, details: []};
            //datas["furniture"]["details"].push(obj);
            $("#furnitureSofaOptions").show();
        }
        else {
            /*for(var i = 0; i < datas["furniture"]["details"].length; i++) {
                if(datas["furniture"]["details"][i]["name"] == name) {
                    datas["furniture"]["details"].splice(i, 1);
                    break;
                }
            }*/
            var ind = 0;
            while(ind < datas["furniture"]["details"].length) {
                if(datas["furniture"]["details"][ind]["category"] == name) {
                    datas["furniture"]["details"].splice(ind, 1);
                    ind --;
                }
                ind ++;
            }
            $("input[name='furnitureSofaOption']").prop("checked", false);
            $("input[name='furnitureSofaOption']").parent().find("input[type='text']").attr("disabled", "true");
            $("input[name='furnitureSofaOption']").parent().find("input[type='text']").removeAttr("required");
            $("input[name='furnitureSofaOption']").parent().find("input[type='text']").val("");
            $("#furnitureSofaOptions").hide();
        }
    }
    else 
    if(this.id == "furnitureTable") {
        if(this.checked) {
            //var obj = {name: name, unit: unit, details: []};
            //datas["furniture"]["details"].push(obj);
            $("#furnitureTableOptions").show();
        }
        else {
            var ind = 0;
            while(ind < datas["furniture"]["details"].length) {
                if(datas["furniture"]["details"][ind]["category"] == name) {
                    datas["furniture"]["details"].splice(ind, 1);
                    ind --;
                }
                ind ++;
            }
            $("input[name='furnitureTableOption']").prop("checked", false);
            $("input[name='furnitureTableOption']").parent().find("input[type='text']").attr("disabled", "true");
            $("input[name='furnitureTableOption']").parent().find("input[type='text']").removeAttr("required");
            $("input[name='furnitureTableOption']").parent().find("input[type='text']").val("");
            $("#furnitureTableOptions").hide();
        }
    }
    else 
    if(this.id == "furnitureChair") {
        if(this.checked) {
            //var obj = {name: name, unit: unit, details: []};
            //datas["furniture"]["details"].push(obj);
            $("#furnitureChairOptions").show();
        }
        else {
            /*for(var i = 0; i < datas["furniture"]["details"].length; i++) {
                if(datas["furniture"]["details"][i]["name"] == name) {
                    datas["furniture"]["details"].splice(i, 1);
                    break;
                }
            }*/
            var ind = 0;
            while(ind < datas["furniture"]["details"].length) {
                if(datas["furniture"]["details"][ind]["category"] == name) {
                    datas["furniture"]["details"].splice(ind, 1);
                    ind --;
                }
                ind ++;
            }
            $("input[name='furnitureChairOption']").prop("checked", false);
            $("input[name='furnitureChairOption']").parent().find("input[type='text']").attr("disabled", "true");
            $("input[name='furnitureChairOption']").parent().find("input[type='text']").removeAttr("required");
            $("input[name='furnitureChairOption']").parent().find("input[type='text']").val("");
            $("#furnitureChairOptions").hide();
        }
    }
    else
    if(this.id == "furnitureOther") {
        if(this.checked) {
            $("#furnitureOtherOptions").find("input").val("");
            $("#furnitureOtherOptions").show();
            $("#furnitureOtherInput").removeAttr("disabled");
            $("#furnitureOtherInput").prop("required", true);
            datas.furniture.other = {name: "", unit: "piece", num: 0.0};
        }
        else {
            datas.furniture.other = {};
            $("#furnitureOtherOptions").find("input").val("");
            $("#furnitureOtherOptions").hide();
            $("#furnitureOtherInput").removeAttr("required");
            $("#furnitureOtherInput").prop("disabled", true);
            $("#furnitureOtherInput").val("");
        }
    }
    //console.log(datas.furniture);
});
$("#furnitureOtherInput").change(function() {
    datas.furniture.other.name = this.value;
})
$("#furnitureOtherOptions").find("input").change(function() {
    datas.furniture.other.num = parseFloat(this.value);
})
$("input[type='checkbox'][name='furnitureSofaOption']").change(function() {
    var name = this.value;
    if(this.value == "Single") {
        if(this.checked) {
            /*for(var i = 0; i < datas["furniture"]["details"].length; i++) {
                if(datas["furniture"]["details"][i]["name"] == "Sofa") {
                    datas["furniture"]["details"][i]["details"].push({name: name, num: 0.0});
                }
            }*/
            datas["furniture"]["details"].push({category: "Sofa", name: name, unit: "piece", num: 0.0});
            $("#sofaSingleNum").removeAttr("disabled");
            $("#sofaSingleNum").prop("required", true);
        }
        else {
            /*for(var i = 0; i < datas["furniture"]["details"].length; i++) {
                if(datas["furniture"]["details"][i]["name"] == "Sofa") {
                    for(var j = 0; j < datas["furniture"]["details"][i]["details"].length; j++) {
                        if(datas["furniture"]["details"][i]["details"][j]["name"] == name) {
                            datas["furniture"]["details"][i]["details"].splice(j, 1);
                            break;
                        }
                    }
                }
            }*/
            for(var i = 0; i < datas["furniture"]["details"].length; i++) {
                if(datas["furniture"]["details"][i]["category"] == "Sofa" && datas["furniture"]["details"][i]["name"] == name) {
                    datas["furniture"]["details"].splice(i, 1);
                    break;
                }
            }
            $("#sofaSingleNum").attr("disabled", "true");
            $("#sofaSingleNum").removeAttr("required");
            $("#sofaSingleNum").val("");
        }
    }
    else
    if(this.value == "Double") {
        if(this.checked) {
            /*for(var i = 0; i < datas["furniture"]["details"].length; i++) {
                if(datas["furniture"]["details"][i]["name"] == "Sofa") {
                    datas["furniture"]["details"][i]["details"].push({name: name, num: 0.0});
                }
            }*/
            datas["furniture"]["details"].push({category: "Sofa", name: name, unit: "piece", num: 0.0});
            $("#sofaDoubleNum").removeAttr("disabled");
            $("#sofaDoubleNum").prop("required", true);
        }
        else {
            /*for(var i = 0; i < datas["furniture"]["details"].length; i++) {
                if(datas["furniture"]["details"][i]["name"] == "Sofa") {
                    for(var j = 0; j < datas["furniture"]["details"][i]["details"].length; j++) {
                        if(datas["furniture"]["details"][i]["details"][j]["name"] == name) {
                            datas["furniture"]["details"][i]["details"].splice(j, 1);
                            break;
                        }
                    }
                }
            }*/
            for(var i = 0; i < datas["furniture"]["details"].length; i++) {
                if(datas["furniture"]["details"][i]["category"] == "Sofa" && datas["furniture"]["details"][i]["name"] == name) {
                    datas["furniture"]["details"].splice(i, 1);
                    break;
                }
            }
            $("#sofaDoubleNum").attr("disabled", "true");
            $("#sofaDoubleNum").removeAttr("required");
            $("#sofaDoubleNum").val("");
        }
    }
    //console.log(datas["furniture"]);
});
$("input[type='checkbox'][name='furnitureSofaOption']").parent().find("input[type='text']").each(function() {
    $(this).change(function() {
        var name = $(this).parent().parent().find("input[name='furnitureSofaOption']").val();
        for(var i = 0; i < datas["furniture"]["details"].length; i++) {
            if(datas["furniture"]["details"][i]["category"] == "Sofa" && datas["furniture"]["details"][i]["name"] == name) {
                datas["furniture"]["details"][i]["num"] = parseFloat(this.value);
            }
        }
    });
    //console.log(datas.furniture);
});

$("input[type='checkbox'][name='furnitureTableOption']").change(function() {
    var name = this.value;
    if(this.checked) {
        datas["furniture"]["details"].push({category: "Table", name: name, unit: "piece", num: 0.0});
        $(this).parent().find("input[type='text']").removeAttr("disabled");
        $(this).parent().find("input[type='text']").prop("required", true);
    }
    else {
        for(var i = 0; i < datas["furniture"]["details"].length; i++) {
            if(datas["furniture"]["details"][i]["category"] == "Table" && datas["furniture"]["details"][i]["name"] == name) {
                datas["furniture"]["details"].splice(i, 1);
                break;
            }
        }
        $(this).parent().find("input[type='text']").attr("disabled", "true");
        $(this).parent().find("input[type='text']").removeAttr("required");
        $(this).parent().find("input[type='text']").val("");
    }
    //console.log(datas.furniture)
});
$("input[type='checkbox'][name='furnitureTableOption']").parent().find("input[type='text']").each(function() {
    $(this).change(function() {
        var name = $(this).parent().parent().find("input[name='furnitureTableOption']").val();
        for(var i = 0; i < datas["furniture"]["details"].length; i++) {
            if(datas["furniture"]["details"][i]["category"] == "Table" && datas["furniture"]["details"][i]["name"] == name) {
                datas["furniture"]["details"][i]["num"] = parseFloat(this.value);
            }
        }
    });
});

$("input[type='checkbox'][name='furnitureChairOption']").change(function() {
    var name = this.value;
    if(this.checked) {
        datas["furniture"]["details"].push({category: "Chair", name: name, unit: "piece", num: 0.0});
        $(this).parent().find("input[type='text']").removeAttr("disabled");
        $(this).parent().find("input[type='text']").prop("required", true);
    }
    else {
        for(var i = 0; i < datas["furniture"]["details"].length; i++) {
            if(datas["furniture"]["details"][i]["category"] == "Chair" && datas["furniture"]["details"][i]["name"] == name) {
                datas["furniture"]["details"].splice(i, 1);
                break;
            }
        }
        $(this).parent().find("input[type='text']").attr("disabled", "true");
        $(this).parent().find("input[type='text']").removeAttr("required");
        $(this).parent().find("input[type='text']").val("");
    }
    //console.log(datas.furniture)
});
$("input[type='checkbox'][name='furnitureChairOption']").parent().find("input[type='text']").each(function() {
    $(this).change(function() {
        var name = $(this).parent().parent().find("input[name='furnitureChairOption']").val();
        for(var i = 0; i < datas["furniture"]["details"].length; i++) {
            if(datas["furniture"]["details"][i]["category"] == "Chair" && datas["furniture"]["details"][i]["name"] == name) {
                datas["furniture"]["details"][i]["num"] = parseFloat(this.value);
            }
        }
    });
});

$("input[type='checkbox'][id^='accessories']").change(function() {
    var pre = this.value.split("+")[0];
    var post = this.value.split("+")[1];
    if(this.checked) {
        //accessories[pre] = post;
        if(pre == "Other") {
            $("#accessoriesOtherInput").removeAttr("disabled");
            $("#accessoriesOtherInput").prop("required", true);
            datas.accessories.other = {name: "", unit: post};
        }
        else {
            datas.accessories.details.push({name: pre, unit: post});
        }
    }
    else {
        //delete accessories[pre];
        if(pre == "Other") {
            var name = $("#accessoriesOtherInput").val();
            datas.accessories.other = {};
            $("#accessoriesOtherInput").removeAttr("required");
            $("#accessoriesOtherInput").prop("disabled", true);
            $("#accessoriesOtherInput").val("");
        }
        else {
            for(var i = 0; i < datas["accessories"]["details"].length; i++) {
                if(datas["accessories"]["details"][i]["name"] == pre) {
                    datas.accessories.details.splice(i, 1);
                    break;
                }
            }
        }
    }
    //console.log(datas.accessories)
});
$("#accessoriesOtherInput").change(function() {
    datas.accessories.other.name = this.value;
});

$("input[type='checkbox'][id^='showsite']").change(function() {
    var pre = this.value;
    if(this.checked) {
        //accessories[pre] = post;
        if(pre == "Other") {
            $("#showsiteOtherInput").removeAttr("disabled");
            $("#showsiteOtherInput").prop("required", true);
            datas.showsite.other = {name: ""};
        }
        else {
            datas.showsite.details.push({name: pre});
        }
    }
    else {
        //delete accessories[pre];
        if(pre == "Other") {
            var name = $("#showsiteOtherInput").val();
            datas.showsite.other = {};
            $("#showsiteOtherInput").removeAttr("required");
            $("#showsiteOtherInput").prop("disabled", true);
            $("#showsiteOtherInput").val("");
        }
        else {
            for(var i = 0; i < datas["showsite"]["details"].length; i++) {
                if(datas["showsite"]["details"][i]["name"] == pre) {
                    datas.showsite.details.splice(i, 1);
                    break;
                }
            }
        }
    }
    //console.log(datas.accessories)
});
$("#showsiteOtherInput").change(function() {
    datas.showsite.other.name = this.value;
});

$("#designUpload").change(function(e) {
    var file = this.files;
    designFile = file;
});

$("#electricUpload").change(function() {
    var fileName = this.files[0].name;
    $(this).next('.custom-file-label').html(fileName);
});


$(document).ready(function(){
    //if(op == "upload") {
    nameEmpty = false;
    boothIdEmpty = false;

    $d = $("#details")[0].contentWindow.document;
    $d.designMode = "on";
    $d.contentEditable = true;
    $d.open();
    $d.close();
    function exe(name, args = null) {
        $d.execCommand(name, false, args);
    }

    $("#flooringDetails").hide();
    $("#panelDetails").hide();
    $("#recieptionDetails").hide();
    $("#showcaseDetails").hide();
    $("#display1080TVOptions").hide();
    $("#display4KTVOptions").hide();
    $("#displaySpeakerMicOptions").hide();
    $("#furnitureSofaOptions").hide();
    $("#furnitureTableOptions").hide();
    $("#furnitureChairOptions").hide();
    $(".graphicDetail").hide();
    $(".lightingDetail").hide();
    $("#displayOtherOptions").hide();
    $("#furnitureOtherOptions").hide();

    $("#furNumDiv").hide();
    $("#graNumDiv").hide();
    $("#carNumDiv").hide();
    $("#hanNumDiv").hide();
    $("#ligNumDiv").hide();
    $("#avNumDiv").hide();
    $("#eleNumDiv").hide();

    $(".categories").find("ul").hide();

    $("#details").bind('keypress', function(e) {
        if(e.keyCode == 13) {
            exe('formatBlock', '<p>');
        }
    })
    $("#boldText").click(function() {
        exe('bold');
    });
    $("#italicText").click(function() {
        exe('italic');
    });
    $("#colorBlack").click(function(e) {
        e.preventDefault();
        exe('foreColor', 'black');
        $("#colorsGroup").html($(this).html());
    });
    $("#colorRed").click(function(e) {
        e.preventDefault();
        exe('foreColor', 'red');
        $("#colorsGroup").html($(this).html());
    });
    $("#colorGreen").click(function(e) {
        e.preventDefault();
        exe('foreColor', 'green');
        $("#colorsGroup").html($(this).html());
    });
    $("#colorOrange").click(function(e) {
        e.preventDefault();
        exe('foreColor', 'orange');
        $("#colorsGroup").html($(this).html());
    });
    $("#colorGray").click(function(e) {
        e.preventDefault();
        exe('foreColor', 'gray');
        $("#colorsGroup").html($(this).html());
    });
    $("#colorBlue").click(function(e) {
        e.preventDefault();
        exe('foreColor', 'blue');
        $("#colorsGroup").html($(this).html());
    });
    $("#h1").click(function(e) {
        e.preventDefault();
        exe('formatBlock', '<h1>');
        $("#sizeGroup").html($(this).text());
    });
    $("#h2").click(function(e) {
        e.preventDefault();
        exe('formatBlock', '<h2>');
        $("#sizeGroup").html($(this).text());
    });
    $("#h3").click(function(e) {
        e.preventDefault();
        exe('formatBlock', '<h3>');
        $("#sizeGroup").html($(this).text());
    });
    $("#h4").click(function(e) {
        e.preventDefault();
        exe('formatBlock', '<h4>');
        $("#sizeGroup").html($(this).text());
    });
    $("#h5").click(function(e) {
        e.preventDefault();
        exe('formatBlock', '<h5>');
        $("#sizeGroup").html($(this).text());
    });
    $("#h6").click(function(e) {
        e.preventDefault();
        exe('formatBlock', '<h6>');
        $("#sizeGroup").html($(this).text());
    });
    $("#pl").click(function(e) {
        e.preventDefault();
        exe('formatBlock', '<p>');
        $("#sizeGroup").html($(this).text());
    });
    $("#preview").click(function() {
        alert($("#details").contents().find("body").html());
    });
    $("#addImageBtn").click(function() {
        $("#addImage").click();
    });
    $("#addImage").change(function() {
        var file = this.files[0];
        var formData = new FormData();
        formData.append('img', file);
        $.ajax({
            type: "post",
            url: "/exhibitor/imageUpload",
            dataType: "json",
            data: formData,
            contentType: false,
            processData: false,
            success: function(res) {
                var des = res["des"];
                exe('insertImage', des);
                $("#details").contents().find("body").html($("#details").contents().find("body").html().replace(/<img src/g, "<img style='max-width:100%;' src"));
            },
            error: function(err) {
                location.href("/");
            }
        });
    });
    /*}
    else {
        nameEmpty = true;
        contentEmpty = true;
        $("#tabSubmit").attr('disabled', false);
    }*/
    $("#designUpload").fileinput({
        uploadUrl: "#",
        theme: "fas",
        showUpload: false,
        showRemove : true,
        dropZoneEnabled: false,
        maxFileCount: 5,
        layoutTemplates: {
            actionUpload: ''
        }
    });
    $("#electricUpload").fileinput({
        uploadUrl: "#",
        theme: "fas",
        showUpload: false,
        showRemove : true,
        dropZoneEnabled: false,
        maxFileCount: 1,
        layoutTemplates: {
            actionUpload: ''
        }
    });
});
$("#nomodify").click(function() {
    $('#tabSubmit').html('Submit');
    $('#tabSubmit').prop('disabled', false);
});
$("#modifytabDia").on('hidden.bs.modal', function() {
    $('#tabSubmit').html('Submit');
    $('#tabSubmit').prop('disabled', false);
})
//$("#previewDia").modal('toggle');
$("#preView").click(function(e) {
    e.preventDefault();
    var text = "";
    text += "<span>Booth No.: " + $("#boothId").val() + "</span><br/>";
    text += "<span>Show Name: " + $("#showName").val() + "</span><br/>";
    text += "<span>Start Date: " + $("#startDate").val() + "</span><br/>";
    text += "<span>End Date: " + $("#endDate").val() + "</span><br/>";
    text += "<span>Booth Size: " + ($("#size1").val() == "" ? "0" : $("#size1").val()) + " ✕ " + ($("#size2").val() == "" ? "0" : $("#size2").val()) + "</span><br/>";
    if(datas.carpet.otherColor != ""){
        text += "<span>Carpet: " + (datas.carpet.name == "" ? "No choice" : datas.carpet.name) + "-" + (datas.carpet.otherColor == "" ? "No choice" : datas.carpet.otherColor) + "</span><br/>";
    }
    else {
        text += "<span>Carpet: " + (datas.carpet.name == "" ? "No choice" : datas.carpet.name) + "-" + (datas.carpet.color == "" ? "No choice" : datas.carpet.color) + "</span><br/>";
    }
    //text += "<span>Flooring: " + datas.flooring.name + "-" + datas.flooring.details + "</span><br/>";
    text += "<span>Wall Panel: " + (datas.panel.name =="" ? "No choice" : datas.panel.name) + "-" + (datas.panel.details == "" ? "No choice" : datas.panel.details) + "</span><br/>";
    /*if(datas.recieption.name == "Yes")
        text += "<span>Recieption: " + datas.recieption.details + "-" + recieptionSize1.toString() + "✕" + recieptionSize2.toString() + "✕" + recieptionSize3.toString() + "</span><br/>";
    if(datas.showcase.name == "Yes")
        text += "<span>Recieption: " + datas.showcase.details + "-" + showcaseSize1.toString() + "✕" + showcaseSize2.toString() + "✕" + showcaseSize3.toString() + "</span><br/>";*/
    for(var i = 0; i < datas.lighting.details.length; i++) {
        text += "<span>Lighting: ";
        text += datas["lighting"]["details"][i]["name"] + "-";
        text += datas["lighting"]["details"][i]["num"] + " ";
        text += datas["lighting"]["details"][i]["unit"];
        text += "</span><br/>";
    }
    if(datas.lighting.other.name != undefined) {
        text += "<span>Lighting: ";
        text += datas["lighting"]["other"]["name"] + "-";
        text += datas["lighting"]["other"]["num"] + " ";
        text += datas["lighting"]["other"]["unit"];
        text += "</span><br/>";
    }
    if(electricFile != undefined) {
        text += "<span>Electricity: ";
        /*var reader = new FileReader();
        reader.onload = function(e) {
            text += "<a target=\"_blank\" href=\"" + e.target.result +"\"><img src=\"" + e.target.result + "\"></a>"
        }
        reader.readAsDataURL(electricFile);*/
        text += "Uploaded!</span><br/>"
    }
    for(var i = 0; i < datas.graphic.details.length; i++) {
        text += "<span>Graphic: ";
        text += datas["graphic"]["details"][i]["name"] + "-";
        text += datas["graphic"]["details"][i]["num"] + " ";
        text += datas["graphic"]["details"][i]["unit"];
        text += "</span><br/>";
    }
    if(datas.graphic.other.name != undefined) {
        text += "<span>Graphic: ";
        text += datas["graphic"]["other"]["name"] + "-";
        text += datas["graphic"]["other"]["num"] + " ";
        text += datas["graphic"]["other"]["unit"];
        text += "</span><br/>";
    }
    for(var i = 0; i < datas.display.details.length; i++) {
        text += "<span>Display: ";
        text += datas["display"]["details"][i]["name"] + "-";
        if(datas["display"]["details"][i]["name"] != "Speaker&Mic") {
            text += datas["display"]["details"][i]["size"] + "\"-";
        }
        text += datas["display"]["details"][i]["num"] + " ";
        text += datas["display"]["details"][i]["unit"];
        text += "</span><br/>";
    }
    if(datas.display.other.name != undefined) {
        text += "<span>Display: ";
        text += datas["display"]["other"]["name"] + "-";
        text += datas["display"]["other"]["num"] + " ";
        text += datas["display"]["other"]["unit"];
        text += "</span><br/>";
    }
    for(var i = 0; i < datas.furniture.details.length; i++) {
        text += "<span>Furniture: ";
        text += datas["furniture"]["details"][i]["category"] + "-";
        text += datas["furniture"]["details"][i]["name"] + "-";
        text += datas["furniture"]["details"][i]["num"] + " ";
        text += datas["furniture"]["details"][i]["unit"];
        text += "</span><br/>";
    }
    if(datas.furniture.other.name != undefined) {
        text += "<span>Furniture: ";
        text += datas["furniture"]["other"]["name"] + "-";
        text += datas["furniture"]["other"]["num"] + " ";
        text += datas["furniture"]["other"]["unit"];
        text += "</span><br/>";
    }
    for(var i = 0; i < datas.accessories.details.length; i++) {
        text += "<span>Accessories: ";
        text += datas["accessories"]["details"][i]["name"];
        //text += datas["accessories"]["details"][i]["num"] + " ";
        //text += datas["furniture"]["details"][i]["unit"];
        text += "</span><br/>";
    }
    if(datas.accessories.other.name != undefined) {
        text += "<span>Accessories: ";
        text += datas["accessories"]["other"]["name"];
        //text += datas["furniture"]["other"]["num"] + " ";
        //text += datas["furniture"]["other"]["unit"];
        text += "</span><br/>";
    }
    for(var i = 0; i < datas.showsite.details.length; i++) {
        text += "<span>Show Site: ";
        text += datas["showsite"]["details"][i]["name"];
        //text += datas["accessories"]["details"][i]["num"] + " ";
        //text += datas["furniture"]["details"][i]["unit"];
        text += "</span><br/>";
    }
    if(datas.showsite.other.name != undefined) {
        text += "<span>Show Site: ";
        text += datas["showsite"]["other"]["name"];
        //text += datas["furniture"]["other"]["num"] + " ";
        //text += datas["furniture"]["other"]["unit"];
        text += "</span><br/>";
    }
    //text += "<span>Display: " + datas.display.name + "-" + datas.display.details + "</span><br/>";
    //text += "<span>Furniture: " + datas.furniture.name + "-" + datas.furniture.details + "</span><br/>";
    /*text += "<span>Accessories: ";
    for(var key in accessories) {
        text += key + ", ";
    }
    text += "</span><br/>";*/
    if(designFile != undefined) {
        text += "<span>Design Plan: ";
        /*var reader = new FileReader();
        reader.onload = function(e) {
            text += "<a target=\"_blank\" href=\"" + e.target.result +"\">file</a>"
        }
        reader.readAsDataURL(designFile);*/
        text += "Uploaded</span><br/>"
    }
    text += "<span>Additional Info:<br/>" + $("#details").contents().find("body").html() + "</span><br/>";
    $("#previewDiaBody").find(".container").html(text);
    $("#previewDia").modal('show');
    //console.log(designFile);
});
$("#yesmodify").click(function(e) {
    e.preventDefault();
    $("#yesmodify").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...');
    $('#yesmodify').prop('disabled', true);
    var formData = new FormData();
    var category = datas;
    var size1 = [];
    //$(".categories")
    /*if(category.recieption.name == "Yes")
        category.recieption.size = recieptionSize1.toString() + "✕" + recieptionSize2.toString() + "✕" + recieptionSize3.toString();
    if(category.showcase.name == "Yes")
        category.showcase.size = showcaseSize1.toString() + "✕" + showcaseSize2.toString() + "✕" + showcaseSize3.toString();*/
    /*for(var key in lighting) {
        category.lighting.details.push({name: key, unit: lighting[key]});
    }
    for(var key in graphic) {
        category.graphic.details.push({name: key, unit: graphic[key]});
    }
    for(var key in accessories) {
        category.accessories.details.push({name: key, unit: accessories[key]});
    }*/
    /*if($("#Furniture").is(":checked")) {
        var obj = {"name": "Furniture","num": $("#furNum").val() == "" ? 0 : parseInt($("#furNum").val())};
        var obj1 = JSON.stringify(obj);
        category.push(obj1);
    }
    if($("#Graphic").is(":checked")) {
        var obj = {"name": "Graphic", "num": $("#graNum").val() == "" ? 0 : parseInt($("#graNum").val())};
        var obj1 = JSON.stringify(obj);
        category.push(obj1);
    }
    if($("#Carpet").is(":checked")) {
        var obj = {"name": "Carpet", "num": $("#carNum").val() == "" ? 0 : parseInt($("#carNum").val())};
        var obj1 = JSON.stringify(obj);
        category.push(obj1);
    }
    if($("#HangingSign").is(":checked")) {
        var obj = {"name": "Hanging Sign", "num": $("#hanNum").val() == "" ? 0 : parseInt($("#hanNum").val())};
        var obj1 = JSON.stringify(obj);
        category.push(obj1);
    }
    if($("#Lighting").is(":checked")) {
        var obj = {"name": "Lighting", "num": $("#ligNum").val() == "" ? 0 : parseInt($("#ligNum").val())};
        var obj1 = JSON.stringify(obj);
        category.push(obj1);
    }
    if($("#AV").is(":checked")) {
        var obj = {"name": "AV", "num": $("#avNum").val() == "" ? 0 : parseInt($("#avNum").val())};
        var obj1 = JSON.stringify(obj);
        category.push(obj1);
    }
    if($("#Electric").is(":checked")) {
        var obj = {"name": "Electric", "num": $("#eleNum").val() == "" ? 0 : parseInt($("#eleNum").val())};
        var obj1 = JSON.stringify(obj);
        category.push(obj1);
    }*/
    size1.push($("#size1").val());
    size1.push($("#size2").val());
    var size = "";
    size = size1.join(",");
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    var date1 = {"start": startDate, "end": endDate};
    var date = JSON.stringify(date1);
    //$("#details").contents().find("body").html($("#details").contents().find("body").html().replace("\"", "'"));
    var detailsContent = $("#details").contents().find("body").html();
    //console.log(detailsContent);
    //detailsContent.replace("\"", "'");
    var details = {
        designFile: {
            filename: []
        },
        additionalInfo: {
            details: detailsContent
        }
    }
    //console.log(details);
    var details1 = JSON.stringify(details);
    //console.log(details1);
    var category1 = JSON.stringify(category);
    //console.log(details);
    /*const formData = {
        boothId: $("#boothId").val(),
        showName: $("#showName").val(),
        date: date,
        author: $("#author").attr('data-name'),
        size: size,
        category: category,
        details: details
    }*/
    formData.append('showName', $("#showName").val());
    formData.append('boothId', $("#boothId").val());
    formData.append('date', date);
    formData.append('author', $("#author").attr('data-name'));
    formData.append('category', category1);
    formData.append('details', details1);
    formData.append('size', size);
    for(var c of designFile) {
        formData.append('dsgn', c);
    }
    if(electricFile != undefined)
        formData.append('elec', electricFile);
    //console.log(electricFile);

    $.ajax({
        type: "post",
        url: "/exhibitor/newjob/",
        dataType: "json",
        data: formData,
        contentType: false,
        processData: false,
        success: function(res) {
            //if(id == "") {
            if(res["success"] == "success") {
                $("#modifytabDiaFooter").hide();
                $("#modifytabDiaBody").html('<div class="container"><p>Create This Job Successfully!</p></br><span id="totalSecond">1</span><span id="second"> Seconds</span><span id="nextcontent"> later to go back to the job page!</span></div>');
                jQuery.getScript("/public/js/autourl.js").done(function(){
                    var fun = auto;
                    //fun("/exhibitor/show?id=" + res["id"]);
                    fun("/")
                });
            }
            else {
                $("#modifytabDiaFooter").hide();
                $("#modifytabDiaBody").html('<div class="container"><p>Job exists! Create failed!</p></br><span id="totalSecond">1</span><span id="second"> Seconds</span><span id="nextcontent"> later to go back to the job page!</span></div>');
                jQuery.getScript("/public/js/autourl.js").done(function(){
                    var fun = auto;
                    //fun("/exhibitor/show?id=" + res["id"]);
                    fun("/")
                });
            }
            /*}
            else {
                $("#modifytabDiaFooter").hide();
                $("#modifytabDiaBody").html('<div class="container"><p>Modify This Job Successfully!</p></br><span id="totalSecond">5</span><span id="second"> Seconds</span><span id="nextcontent"> later to go back to the job page!</span></div>');
                jQuery.getScript("/public/js/autourl.js").done(function(){
                    var fun = auto;
                    fun("/exhibitor/show?id=" + res["id"]);
                });
            }*/
        },
        error: function(err) {
            /*if(err["id"] != null) {
                $("#modifytabDiaFooter").hide();
                $("#modifytabDiaBody").html('<div class="container"><p>Modify job failed!</p></br><span id="totalSecond">5</span><span id="second"> Seconds</span><span id="nextcontent"> later to go back to the job page!</span></div>');
                jQuery.getScript("/public/js/autourl.js").done(function(){
                    var fun = auto;
                    fun("/exhibitor/show?id=" + err["id"]);
                });
            }
            else {*/
                $("#modifytabDiaFooter").hide();
                $("#modifytabDiaBody").html('<div class="container"><p>Create job failed!</p></br><span id="totalSecond">5</span><span id="second"> Seconds</span><span id="nextcontent"> later to go back homepage!</span></div>');
                jQuery.getScript("/public/js/autourl.js").done(function(){
                    var fun = auto;
                    fun("/");
                });
            //}
        }
    });
});